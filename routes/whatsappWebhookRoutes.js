const express = require("express");
const router = express.Router();
const knex = require("../db/knex"); // Your Knex instance
const axios = require("axios");

const VERIFY_TOKEN = "your_secure_token_here";
const WHATSAPP_TOKEN = "your_long_lived_whatsapp_token";
const PHONE_NUMBER_ID = "your_phone_number_id";
//EAANt0erUqxABOyVpFtSQAHBeWaoTLA1pOeGRrJf7mndB5gXZAbdkwbrEwGGzKDvKYVmWtU4E0NcJECXY5ZASI4YOblSsmZCkRtJXDndO92VIVeCIcF4VEDfIxySRvgKr5gOM09UXWboaqGT8UZAIZBRhjspVf4McZCaEum5exWDAJE6sdKZAqgLSUt6kWoky7FiJ4hhSOAl4HFEgz0dLwluVZBS8X8bD81JIVTUZD
// Helper to send WhatsApp message
async function sendMessage(phone, text, options = {}) {
    await axios.post(
        `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: { body: text },
            ...options,
        },
        {
            headers: {
                Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
            },
        }
    );
}

// Webhook verification GET
router.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode && token === VERIFY_TOKEN) return res.status(200).send(challenge);
    else return res.sendStatus(403);
});

// Webhook receive POST
router.post("/webhook", async (req, res) => {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0]?.value?.messages?.[0];

    if (!change) return res.sendStatus(200);

    const phone = change.from;
    const message = change.text?.body?.trim();

    let user = await knex("customer_leads").where({ phone_number: phone }).first();

    if (!user) {
        // New customer, insert and ask for name
        await knex("customer_leads").insert({ phone_number: phone, state: "awaiting_name" });
        await sendMessage(phone, "Hi! Welcome to Shastri Sandip Astrology. May I know your good name?");
        return res.sendStatus(200);
    }

    switch (user.state) {
        case "awaiting_name":
            await knex("customer_leads").where({ phone_number: phone }).update({ name: message, state: "awaiting_dob" });
            await sendMessage(phone, `Nice to meet you, ${message}! Can you please share your date of birth? (DD-MM-YYYY)`);
            break;

        case "awaiting_dob":
            if (!/^\d{2}-\d{2}-\d{4}$/.test(message)) {
                await sendMessage(phone, "Please enter DOB in format DD-MM-YYYY.");
                break;
            }
            await knex("customer_leads").where({ phone_number: phone }).update({ dob: message, state: "awaiting_birth_place" });
            await sendMessage(phone, "Thank you! Can you tell me your birth place (City/Village name)?");
            break;

        case "awaiting_birth_place":
            await knex("customer_leads").where({ phone_number: phone }).update({ birth_place: message, state: "awaiting_birth_time" });
            await sendMessage(phone, "Noted. Please share your exact birth time (HH:MM AM/PM).");
            break;

        case "awaiting_birth_time":
            if (!/^\d{1,2}:\d{2}\s?(AM|PM)$/i.test(message)) {
                await sendMessage(phone, "Please enter time in format HH:MM AM/PM");
                break;
            }
            await knex("customer_leads").where({ phone_number: phone }).update({ birth_time: message, state: "showing_services" });

            // Fetch services
            const services = await knex("services").select("*");
            const serviceList = services.map((s, i) => `${i + 1}. ${s.name} - ₹${s.price}`).join("\n");

            await sendMessage(phone, `Here are our services:\n\n${serviceList}\n\nPlease reply with the service number to proceed.`);
            break;

        case "showing_services":
            const serviceIndex = parseInt(message) - 1;
            const servicesAll = await knex("services").select("*");

            if (isNaN(serviceIndex) || !servicesAll[serviceIndex]) {
                await sendMessage(phone, "Invalid selection. Please reply with a valid service number.");
                break;
            }

            const selected = servicesAll[serviceIndex];

            await knex("customer_leads").where({ phone_number: phone }).update({ state: "awaiting_payment" });

            await sendMessage(
                phone,
                `Great choice! Please scan the below QR to pay ₹${selected.price}:\n\nUPI ID: ${selected.upi_id}\n\nAfter payment, please reply with the payment screenshot.`,
            );

            // Optionally send image or QR using media API here

            break;

        case "awaiting_payment":
            if (change.type === "image" || change.type === "document") {
                const mediaId = change.image?.id || change.document?.id;
                await knex("customer_leads").where({ phone_number: phone }).update({ screenshot_url: mediaId, state: "completed" });
                await sendMessage(phone, "Payment received! Thank you. We will contact you soon with your consultation.");
            } else {
                await sendMessage(phone, "Please send the payment screenshot as an image or document.");
            }
            break;

        case "completed":
            await sendMessage(phone, "We’ve already received your details. We’ll be in touch soon!");
            break;

        default:
            await sendMessage(phone, "Something went wrong. Please type 'Hi' to start again.");
            break;
    }

    res.sendStatus(200);
});

module.exports = router;
