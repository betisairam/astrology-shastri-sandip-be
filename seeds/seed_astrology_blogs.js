const slugify = require('slugify');

const now = new Date().toISOString();

const blogs = [
    {
        title: "Understanding Your Birth Chart: The Blueprint of Your Soul",
        summary: "A deep dive into natal charts and what they reveal about personality, destiny, and soul purpose in astrology.",
        tags: ['birth chart', 'natal chart', 'astrology basics'],
        content: `
# Understanding Your Birth Chart: The Blueprint of Your Soul

Your **birth chart** — also known as a natal chart — is the cosmic map imprinted at the exact time and place you were born. It's more than your sun sign. It's a full-circle snapshot of where every planet, sign, and house was positioned, and how they interact.

## 🌌 Why Your Birth Chart Matters

Astrologers see the birth chart as a blueprint of your potential. It reveals core personality traits, your karmic lessons, and spiritual mission.

- **Sun sign**: Your ego and identity
- **Moon sign**: Your emotional inner world
- **Rising sign (Ascendant)**: Your outward persona and life path
- **Houses**: Where the action happens
- **Aspects**: The angles and energies planets form

## 🧭 Reading Your Chart

Understanding planetary rulership, modality (cardinal/fixed/mutable), and elements (fire/earth/air/water) unlocks the layers of your psyche.

*For example:*

- Venus in Taurus in the 7th house? Expect deep loyalty and romantic sensibility.
- Mars square Saturn? You may face frustration in taking initiative — but perseverance is your gift.

## 🌟 The Power of Interpretation

Each chart is unique. A good astrologer synthesizes all placements and aspects to give you the most accurate insight.

---
Whether you're a beginner or seasoned astro-enthusiast, studying your birth chart will reveal hidden patterns and purpose.
    `.trim(),
    },

    {
        title: "Zodiac Archetypes Explained: A Journey Through the 12 Signs",
        summary: "Explore the ancient archetypes behind each zodiac sign and how they influence your behavior, relationships, and destiny.",
        tags: ['zodiac signs', 'personality', 'astrology'],
        content: `
# Zodiac Archetypes Explained: A Journey Through the 12 Signs

Each of the 12 zodiac signs represents a universal archetype — a timeless energy reflected in nature, mythology, and human psychology.

## 🔥 Fire Signs (Aries, Leo, Sagittarius)

These signs embody passion, courage, and the drive to explore.

- **Aries**: The Warrior — brave, bold, and headstrong.
- **Leo**: The King/Queen — proud, expressive, and warm-hearted.
- **Sagittarius**: The Explorer — optimistic, philosophical, and freedom-loving.

## 🌊 Water Signs (Cancer, Scorpio, Pisces)

Deeply intuitive and emotional.

- **Cancer**: The Nurturer — caring, protective, and sensitive.
- **Scorpio**: The Alchemist — transformative, intense, and magnetic.
- **Pisces**: The Mystic — compassionate, imaginative, and ethereal.

## 💨 Air Signs (Gemini, Libra, Aquarius)

Thinkers, communicators, and innovators.

- **Gemini**: The Messenger — curious, witty, and restless.
- **Libra**: The Diplomat — balanced, artistic, and justice-seeking.
- **Aquarius**: The Visionary — rebellious, genius, and unconventional.

## 🌍 Earth Signs (Taurus, Virgo, Capricorn)

Grounded, pragmatic, and loyal.

- **Taurus**: The Builder — sensual, steady, and value-driven.
- **Virgo**: The Healer — analytical, modest, and service-oriented.
- **Capricorn**: The Leader — ambitious, disciplined, and strategic.

---
By understanding zodiac archetypes, you tap into ancient wisdom that empowers self-acceptance and growth.
    `.trim(),
    },

    {
        title: "The Influence of Retrograde Planets in Your Horoscope",
        summary: "Retrogrades aren’t just Mercury mishaps. Learn how they affect karma, past lives, and personal growth in your chart.",
        tags: ['retrograde', 'karma', 'past lives'],
        content: `
# The Influence of Retrograde Planets in Your Horoscope

Retrograde planets get a bad rap, especially Mercury. But retrogrades are much more than communication breakdowns.

## 🔄 What Is Retrograde?

When a planet appears to move backward in the sky, it's called retrograde motion. In astrology, this suggests the energy of the planet turns inward — more reflective and karmic.

## 🌌 Karmic Implications

Retrograde planets often indicate:

- **Past life patterns**
- **Inner processing**
- **Delayed external expression**

**Mercury retrograde in your natal chart**? You may process thoughts internally or feel misunderstood as a child — but develop genius-level insights later in life.

**Saturn retrograde** points to karmic lessons around responsibility, authority, and self-worth.

## 🧭 How to Interpret Them

Don't fear retrogrades. Instead, embrace them for:

- Deep personal growth
- Revisiting lessons
- Healing old wounds

---
Retrogrades in your chart are sacred opportunities to reclaim your soul’s unfinished business and alchemize past karma.
    `.trim(),
    },

    {
        title: "The Houses in Astrology: Your Life’s Theater",
        summary: "Each of the 12 houses represents a distinct area of life — from money to love to career. Here’s how to decode them.",
        tags: ['astrology houses', 'life areas', 'natal chart'],
        content: `
# The Houses in Astrology: Your Life’s Theater

If the zodiac signs are the roles, and the planets are the actors, the **houses** are the stage where everything plays out.

## 🏡 What Are the Houses?

There are 12 houses, each representing a domain of life:

1. **Self**: Identity, appearance, first impressions
2. **Money**: Finances, possessions, self-worth
3. **Communication**: Siblings, mind, short trips
4. **Home**: Family, roots, emotional security
5. **Creativity**: Romance, children, hobbies
6. **Work & Health**: Daily routines, service, wellbeing
7. **Partnerships**: Marriage, contracts, open enemies
8. **Transformation**: Death, sex, shared resources
9. **Philosophy**: Higher education, travel, beliefs
10. **Career**: Public life, status, achievement
11. **Community**: Friends, groups, vision
12. **Spirituality**: Dreams, subconscious, endings

## 🔍 Why They Matter

Understanding which planets fall into which houses gives nuanced depth to your personality and purpose.

---
Your birth chart isn’t complete without knowing the house placements. They tell the real story of how your destiny unfolds.
    `.trim(),
    },

    {
        title: "Vedic Astrology vs Western Astrology: What’s the Difference?",
        summary: "Vedic and Western astrology use different zodiacs and philosophies. Discover which system may resonate more with your soul.",
        tags: ['vedic astrology', 'sidereal', 'western astrology'],
        content: `
# Vedic Astrology vs Western Astrology: What’s the Difference?

Both Vedic (Jyotish) and Western astrology offer profound insight — but they differ significantly.

## 🧭 Sidereal vs Tropical

- **Vedic**: Uses the sidereal zodiac (aligned with constellations)
- **Western**: Uses the tropical zodiac (based on the seasons)

This can shift your sun sign! A Western Leo may be a Vedic Cancer.

## 📚 Philosophy & Focus

- **Western**: Psychological, self-growth, modern
- **Vedic**: Predictive, karmic, dharma-focused

Vedic uses **nakshatras**, **dasha periods**, and detailed **karma analysis** to determine life path.

## 🕉 Spiritual Approach

Vedic astrology is deeply spiritual and is used to guide marriage, career, and rituals.

---
Whether you choose Vedic or Western, both offer sacred maps to navigate your soul’s evolution.
    `.trim(),
    }
];

exports.seed = async function (knex) {
    await knex('blogs').del();

    const now = new Date();

    for (const blog of blogs) {
        await knex('blogs').insert({
            title: blog.title,
            slug: slugify(blog.title, { lower: true, strict: true }),
            summary: blog.summary,
            content: blog.content,
            tags: JSON.stringify(blog.tags),
            status: 'published',
            published_at: now,
            created_by: 1, // Optional: seed admin ID
            created_at: now,
            updated_at: now
        });
    }
};
