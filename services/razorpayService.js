const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (amountInRs, receiptId) => {
    const options = {
        amount: amountInRs * 100, // ₹100 => 10000 paise
        currency: 'INR',
        receipt: receiptId,
        payment_capture: 1
    };

    // const res = await razorpay.orders.create(options);
    // console.log('res', res)
    // return res
    console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID);
    console.log('Razorpay Secret:', process.env.RAZORPAY_KEY_SECRET);
    try {
        const res = await razorpay.orders.create(options);
        console.log('✅ Razorpay Order Created:', res);
        return res;
    } catch (err) {
        console.error('❌ Razorpay order creation failed:', err); // Log full error
        throw err; // Let it bubble up
    }
};

module.exports = {
    createOrder
};
