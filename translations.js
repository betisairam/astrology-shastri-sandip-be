const translations= {
  en: {
    // Services Page
    services: {
      title: "Our Services",
      subtitle: "Comprehensive Astrological Solutions",
      all: "All Services",
      filter: "Filter by Service Category",
      viewAll: "View All Services",
      bookNow: "Book Now",
      categories: {
        kundli: "Kundli Milan",
        puja: "Puja & Muhurat",
        gems: "Gems & Remedies",
        business: "Business Solutions",
        personal: "Personal Solutions",
      },
      "kundli-milan": {
        title: "Kundli Matching",
        content:
          "Comprehensive pre-marriage compatibility report based on birth charts, including Gun Milan, Mangal Dosha, planetary positions, and relationship harmony.",
        price: "₹149",
        actualPrice: "₹299",
        cta: "Book Now",
        deliveryDays: 1,
        deliveryTime: "24-48 hours",
        format: "Online / Offline",
        bestFor: "Marriage-seeking individuals",
        type: "relationship",
        features: [
          "Detailed Gun Milan",
          "Mangal Dosha analysis",
          "Planetary position analysis",
          "Marriage compatibility report",
        ],
      },
      "vastu-puja": {
        title: "Vastu Puja Muhurat",
        content:
          "Best date and ritual method for house or office entry, includes detailed Vastu Puja guidance via online/offline mode.",
        price: "₹99",
        actualPrice: "₹199",
        cta: "Get Muhurat",
        deliveryDays: 4,
        deliveryTime: "3-5 days",
        format: "Online / Offline",
        bestFor: "New home/office owners",
        type: "ritual",
        features: [
          "Auspicious date and muhurat",
          "Complete Vastu Puja method",
          "Online/offline service",
          "Vastu defect remedies",
        ],
      },
      "siddh-ratna": {
        title: "Energized Gemstone Delivery",
        content:
          "Receive purified and astrologically energized gemstones at home to reduce planetary doshas and invite positivity.",
        price: "₹999",
        actualPrice: "₹1999",
        cta: "Order Now",
        deliveryDays: 8.5,
        deliveryTime: "7-10 days",
        format: "Home delivery",
        bestFor: "Individuals with planetary defects",
        type: "remedy",
        features: [
          "Pure and completely purified gems",
          "Planetary defect pacification",
          "Positive life changes",
          "Safe home delivery",
        ],
      },
      "dosh-nivaran": {
        title: "Online Dosha Nivaran Puja",
        content: "Live-streamed pujas by expert priests for Rahu-Ketu, Mangal, Kaal Sarp, or Pitru dosha remedies.",
        price: "₹4999",
        actualPrice: "₹9999",
        cta: "Book Puja",
        deliveryDays: 5,
        deliveryTime: "On scheduled date",
        format: "Online (Live)",
        bestFor: "Individuals suffering from planetary defects",
        type: "ritual",
        features: [
          "Puja by experienced pandits",
          "Rahu-Ketu, Mangal, Kalsarp, Pitru dosh nivaran",
          "Live puja darshan",
          "Puja certificate",
        ],
      },
      "business-solution": {
        title: "Business Problem Solution",
        content:
          "Astrological solutions, gemstones, and pujas for resolving recurring losses or growth issues in your business.",
        price: "₹249",
        actualPrice: "₹499",
        cta: "Get Advice",
        deliveryDays: 4,
        deliveryTime: "3-5 days",
        format: "Online consultation",
        bestFor: "Businesspeople and entrepreneurs",
        type: "business",
        features: [
          "Business problem analysis",
          "Suitable remedies and gems",
          "Business growth puja",
          "Financial stability measures",
        ],
      },
      "relationship-solution": {
        title: "Relationship Problem Solution",
        content: "Resolve love, marriage delays, or spousal disputes through customized astrological remedies.",
        price: "₹499",
        actualPrice: "₹999",
        cta: "Resolve Now",
        deliveryDays: 1.5,
        deliveryTime: "24-48 hours",
        format: "Online consultation",
        bestFor: "Individuals with love and marital problems",
        type: "relationship",
        features: [
          "Astrological consultation",
          "Relationship harmony remedies",
          "Love life problem solutions",
          "Remedies for marriage delay",
        ],
      },
      "abroad-study": {
        title: "Study Abroad Yoga",
        content:
          "Check if your horoscope indicates success in studying abroad and learn remedies to boost your chances.",
        price: "₹299",
        actualPrice: "₹699",
        cta: "Check Now",
        deliveryDays: 4,
        deliveryTime: "3-5 days",
        format: "Online consultation",
        bestFor: "Students aspiring to study abroad",
        type: "education",
        features: [
          "Foreign travel yoga analysis",
          "Success measures",
          "Opportunity analysis",
          "Educational success remedies",
        ],
      },
      "money-leakage": {
        title: "Money Leakage Solution",
        content:
          "Identify planetary or Vastu doshas causing financial instability despite good income; get effective remedies.",
        price: "₹199",
        actualPrice: "₹499",
        cta: "Fix Now",
        deliveryDays: 4,
        deliveryTime: "3-5 days",
        format: "Online consultation",
        bestFor: "Individuals with financial instability",
        type: "business",
        features: [
          "Planetary defect analysis",
          "Vastu defect analysis",
          "Financial stability remedies",
          "Wealth growth remedies",
        ],
      },
      "house-yoga": {
        title: "Own House Yoga",
        content:
          "Know the right time and remedies to successfully purchase your dream home through horoscope analysis.",
        price: "₹299",
        actualPrice: "₹699",
        cta: "Know Timing",
        deliveryDays: 1.5,
        deliveryTime: "24-48 hours",
        format: "Online consultation",
        bestFor: "Individuals looking to buy a house",
        type: "property",
        features: [
          "Auspicious time for house purchase",
          "Obstacle removal remedies",
          "Vastu-friendly house selection",
          "Griha Pravesh muhurat",
        ],
      },
      "family-solution": {
        title: "Family Problem Solution",
        content:
          "Remedies, pujas, and planetary healing to resolve domestic disputes, disagreements, and health concerns in the family.",
        price: "₹99",
        actualPrice: "₹299",
        cta: "Resolve Issue",
        deliveryDays: 4,
        deliveryTime: "3-5 days",
        format: "Online / Offline",
        bestFor: "Individuals with family problems",
        type: "relationship",
        features: ["Shanti puja", "Planetary remedies", "Positive remedies", "Family harmony measures"],
      },
    },

    serviceComparison: {
      title: "Compare Our Services",
      subtitle:
        "Find the perfect astrological service for your specific needs with our comprehensive comparison table.",
      sortBy: "Sort by",
      filterByType: "Filter by type",
      allTypes: "All types",
      defaultOrder: "Default Order",
      serviceType: "Service Type",
      allServices: "All Services",
      service: "Service",
      price: "Price",
      actualPrice: "Actual Price",
      deliveryTime: "Delivery Time",
      format: "Format",
      bestFor: "Best For",
      type: "Type",
      features: "Features",
      viewDetails: "View Details",
      hideDetails: "Hide Details",
      types: {
        relationship: "Relationship",
        business: "Business",
        property: "Property",
        ritual: "Ritual",
        remedy: "Remedy",
        education: "Education",
        all: "All",
      },
    },

    faq: {
      categories: {
        general: {
          title: "General Questions About Astrology",
          items: {
            whatIsVedic: {
              question: "What is Vedic astrology?",
              answer:
                "Vedic astrology, also known as Jyotish, is an ancient Indian system of astrology that helps understand the influence of celestial bodies on human lives. It uses the sidereal zodiac and focuses on karma and spiritual growth.",
            },
            howHelp: {
              question: "How can astrology help me?",
              answer:
                "Astrology can provide insights into your personality, strengths, weaknesses, and life path. It can help you understand challenging periods, make informed decisions, find suitable career paths, and improve relationships.",
            },
            accuracy: {
              question: "How accurate are astrological predictions?",
              answer:
                "Astrological predictions are based on planetary positions and their influences. While they can provide valuable insights and guidance, they should be viewed as possibilities rather than absolute certainties. Free will always plays a role in shaping your destiny.",
            },
            changeDestiny: {
              question: "Can astrology change my destiny?",
              answer:
                "Astrology doesn't change your destiny but helps you understand it better. With this knowledge, you can make informed choices, mitigate challenges through remedies, and maximize favorable periods, effectively navigating your life path with greater awareness.",
            },
          },
        },
        consultations: {
          title: "About Consultations",
          items: {
            information: {
              question: "What information do I need for a consultation?",
              answer:
                "For an accurate reading, you'll need to provide your date of birth, exact time of birth, and place of birth. This information helps create your birth chart (Kundli), which is the foundation of your astrological reading.",
            },
            duration: {
              question: "How long does a consultation take?",
              answer:
                "A standard consultation typically lasts between 30 to 60 minutes, depending on the complexity of your questions and the depth of analysis required. Follow-up sessions are usually shorter.",
            },
            online: {
              question: "Do you offer online consultations?",
              answer:
                "Yes, we offer online consultations via video call, phone call, or WhatsApp. This makes our services accessible to clients worldwide while maintaining the same quality and accuracy as in-person consultations.",
            },
            frequency: {
              question: "How often should I consult an astrologer?",
              answer:
                "This varies based on individual needs. Some clients consult annually for a general forecast, while others seek guidance during major life transitions or challenging periods. We recommend at least an annual review of your chart.",
            },
          },
        },
        services: {
          title: "Our Services",
          items: {
            remedies: {
              question: "What remedies do you suggest?",
              answer:
                "We suggest personalized remedies based on your birth chart, including gemstones, mantras, rituals, charitable activities, and lifestyle changes. These remedies aim to mitigate negative planetary influences and enhance positive ones.",
            },
            gemstones: {
              question: "How do I choose the right gemstone?",
              answer:
                "The right gemstone depends on your birth chart and the specific planetary influences affecting you. We provide detailed guidance on selecting, purifying, and wearing gemstones based on your unique astrological profile.",
            },
            compatibility: {
              question: "Can you check compatibility for marriage?",
              answer:
                "Yes, we offer comprehensive compatibility analysis (Kundli Milan) that examines various aspects of both birth charts to determine relationship harmony, potential challenges, and overall compatibility for marriage.",
            },
            corporate: {
              question: "Do you offer corporate astrology services?",
              answer:
                "Yes, we provide specialized corporate astrology services including business timing, partnership analysis, investment guidance, and workplace harmony assessments to help businesses make strategic decisions.",
            },
          },
        },
        practical: {
          title: "Practical Information",
          items: {
            payment: {
              question: "What payment methods do you accept?",
              answer:
                "We accept various payment methods including credit/debit cards, UPI, bank transfers, and PayPal for international clients. All payments are secure and encrypted.",
            },
            cancellation: {
              question: "What is your cancellation policy?",
              answer:
                "We understand that circumstances change. You can reschedule or cancel your appointment up to 24 hours before the scheduled time without any charge. Cancellations with less than 24 hours' notice may incur a fee.",
            },
            confidentiality: {
              question: "Is my consultation confidential?",
              answer:
                "Absolutely. We maintain strict confidentiality for all consultations. Your personal information and the details discussed during sessions are never shared with third parties.",
            },
            languages: {
              question: "What languages do you offer consultations in?",
              answer:
                "We offer consultations in English, Hindi, and Gujarati to accommodate a diverse range of clients and ensure clear communication.",
            },
          },
        },
      },
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our astrology services and consultations",
      searchPlaceholder: "Search for questions...",
      searchAriaLabel: "Search frequently asked questions",
      tableOfContents: "Categories",
      noResults: "No results found for your search",
      clearSearch: "Clear search",
      stillHaveQuestions: "Still have questions?",
      contactPrompt: "Can't find the answer you're looking for? Please contact us directly for more information.",
      wasThisHelpful: "Was this helpful?",
      thankYouFeedback: "Thank you for your feedback!",
      needMoreHelp: "Thank you for your feedback. If you need more help, please contact us.",
      relatedQuestions: "Related Questions",
      copyLink: "Copy link",
      copied: "Copied!",
    },
    disclaimer: {
      title: "Disclaimer",
      subtitle: "Important information about our services and website",
      lastUpdated: "Last Updated: May 9, 2023",
      sections: {
        overview: {
          title: "Overview",
          content:
            "This disclaimer governs your use of our website and services. By using our website or services, you accept this disclaimer in full. If you disagree with any part of this disclaimer, you must not use our website or services.",
        },
        astrologicalServices: {
          title: "Astrological Services",
          content:
            "The astrological services, readings, and predictions provided through this website are for entertainment and informational purposes only. While we strive to provide accurate and insightful information, astrology is not an exact science, and results may vary. We do not guarantee specific outcomes or results from following our astrological advice or remedies.",
        },
        externalLinks: {
          title: "External Links",
          content:
            "Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.",
        },
        privacy: {
          title: "Privacy",
          content:
            "Please refer to our Privacy Policy for information about how we collect, use, and protect your personal data.",
        },
        changes: {
          title: "Changes to Disclaimer",
          content:
            "We may update this disclaimer from time to time without notice. By continuing to use our website and services after any changes to this disclaimer, you agree to be bound by the revised disclaimer.",
        },
        contact: {
          title: "Contact Information",
          content:
            "If you have any questions about this disclaimer, please contact us through the contact information provided on our website.",
        },
        governingLaw: {
          title: "Governing Law",
          content:
            "This disclaimer is governed by and construed in accordance with the laws of India, and any disputes relating to this disclaimer shall be subject to the exclusive jurisdiction of the courts of India.",
        },
      },
      tableOfContents: "Table of Contents",
      backToTop: "Back to Top",
    },
  },

  hi: {

    // Services Page
    services: {
      title: "हमारी सेवाएं",
      subtitle: "व्यापक ज्योतिषीय समाधान",
      all: "सभी सेवाएं",
      filter: "सेवा श्रेणी द्वारा फ़िल्टर करें",
      viewAll: "सभी सेवाएं देखें",
      bookNow: "अभी बुक करें",
      categories: {
        kundli: "कुंडली मिलान",
        puja: "पूजा और मुहूर्त",
        gems: "रत्न और उपाय",
        business: "व्यापार समाधान",
        personal: "व्यक्तिगत समाधान",
      },
      "kundli-milan": {
        title: "कुंडली मिलान (Kundli Milan)",
        content:
          "विवाह से पहले वर और वधू की कुंडली का मिलान करना अत्यंत आवश्यक होता है। हम आपकी जन्म कुंडली के आधार पर गुण मिलान, मंगल दोष, ग्रहों की स्थिति और वैवाहिक अनुकूलता की विस्तृत रिपोर्ट प्रदान करते हैं।",
        price: "₹149",
        actualPrice: "₹299",
        cta: "बुक करें",
        deliveryDays: 1,
        deliveryTime: "24-48 घंटे",
        format: "ऑनलाइन / ऑफलाइन",
        bestFor: "विवाह योग्य व्यक्ति",
        type: "relationship",
        features: ["विस्तृत गुण मिलान", "मंगल दोष विश्लेषण", "ग्रहों की स्थिति का विश्लेषण", "विवाह संगतता रिपोर्ट"],
      },
      "vastu-puja": {
        title: "वास्तु पूजा मुहूर्त (Vastu Puja Muhurat)",
        content:
          "नए घर या ऑफिस में प्रवेश से पहले शुभ वास्तु पूजा आवश्यक होती है। हम आपको वास्तु पूजा के लिए सर्वोत्तम तिथि, मुहूर्त और संपूर्ण विधि सहित ऑनलाइन या ऑफलाइन सेवा प्रदान करते हैं।",
        price: "₹99",
        actualPrice: "₹199",
        cta: "मुहूर्त पाएं",
        deliveryDays: 4,
        deliveryTime: "3-5 दिन",
        format: "ऑनलाइन / ऑफलाइन",
        bestFor: "नए घर/कार्यालय के मालिक",
        type: "ritual",
        features: ["शुभ तिथि और मुहूर्त", "पूर्ण वास्तु पूजा विधि", "ऑनलाइन/ऑफलाइन सेवा", "वास्तु दोष निवारण"],
      },
      "siddh-ratna": {
        title: "सिद्ध किए गए रत्न की डिलीवरी (Siddh Ratna Delivery)",
        content:
          "हम आपको विशुद्ध और पूरी विधि से सिद्ध किए गए रत्न उपलब्ध कराते हैं, जो आपके ग्रह दोषों को शांत कर जीवन में सकारात्मक परिवर्तन लाते हैं। घर बैठे रत्न की सुरक्षित डिलीवरी की सुविधा उपलब्ध है।",
        price: "₹999",
        actualPrice: "₹1999",
        cta: "मंगवाएं",
        deliveryDays: 8.5,
        deliveryTime: "7-10 दिन",
        format: "घर पर डिलीवरी",
        bestFor: "ग्रहीय दोष वाले व्यक्ति",
        type: "remedy",
        features: ["शुद्ध और पूरी तरह से शुद्ध किए हुए रत्न", "ग्रहीय दोष शांति", "सकारात्मक परिवर्तन", "सुरक्षित घर डिलीवरी"],
      },
      "dosh-nivaran": {
        title: "ऑनलाइन पूजा से दोष निवारण (Online Dosh Nivaran Puja)",
        content:
          "राहु-केतु दोष, मंगल दोष, कालसर्प योग या पितृ दोष जैसे अनेक ग्रह दोषों की शांति के लिए अनुभवी पंडितों द्वारा ऑनलाइन पूजा करवाई जाती है, जिसे आप लाइव देख सकते हैं।",
        price: "₹4999",
        actualPrice: "₹9999",
        cta: "पूजा बुक करें",
        deliveryDays: 5,
        deliveryTime: "निर्धारित तिथि पर",
        format: "ऑनलाइन (लाइव)",
        bestFor: "ग्रहीय दोष से पीड़ित व्यक्ति",
        type: "ritual",
        features: ["अनुभवी पंडितों द्वारा पूजा", "राहु-केतु, मंगल, कालसर्प, पितृ दोष निवारण", "लाइव पूजा दर्शन", "पूजा प्रमाणपत्र"],
      },
      "business-solution": {
        title: "व्यवसाय संबंधी समाधान (Business Problem Solution)",
        content:
          "यदि आपका व्यापार ठीक से नहीं चल रहा या बार-बार हानि हो रही है, तो ग्रहों की स्थिति के आधार पर उपयुक्त उपाय, रत्न और पूजाओं के माध्यम से समाधान प्रदान किया जाता है।",
        price: "₹249",
        actualPrice: "₹499",
        cta: "सलाह लें",
        deliveryDays: 4,
        deliveryTime: "3-5 दिन",
        format: "ऑनलाइन परामर्श",
        bestFor: "व्यापारी और उद्यमी",
        type: "business",
        features: ["व्यापार समस्या विश्लेषण", "उपयुक्त उपाय और रत्न", "व्यापार वृद्धि पूजा", "वित्तीय स्थिरता उपाय"],
      },
      "relationship-solution": {
        title: "रिलेशनशिप समस्या समाधान (Relationship Problem Solution)",
        content:
          "प्रेम जीवन, पति-पत्नी के झगड़े, मनमुटाव या विवाह में देरी जैसी समस्याओं के लिए ज्योतिषीय परामर्श और उपयुक्त उपाय उपलब्ध हैं जो आपके संबंधों में सामंजस्य लाने में मदद करते हैं।",
        price: "₹499",
        actualPrice: "₹999",
        cta: "समस्या सुलझाएं",
        deliveryDays: 1.5,
        deliveryTime: "24-48 घंटे",
        format: "ऑनलाइन परामर्श",
        bestFor: "प्रेम और वैवाहिक समस्याओं वाले व्यक्ति",
        type: "relationship",
        features: ["ज्योतिषीय परामर्श", "रिश्ते में सामंजस्य उपाय", "प्रेम जीवन समस्या समाधान", "विवाह में देरी के उपाय"],
      },
      "abroad-study": {
        title: "विदेश में पढ़ाई के योग (Study in Abroad Yoga)",
        content:
          "क्या आपके मन में विदेश जाकर पढ़ाई करने का सपना है? आपकी कुंडली यह संकेत देती है कि विदेश में पढ़ाई के कितने योग हैं और किन उपायों से वह सफल हो सकते हैं।",
        price: "₹299",
        actualPrice: "₹699",
        cta: "जांचें योग",
        deliveryDays: 4,
        deliveryTime: "3-5 दिन",
        format: "ऑनलाइन परामर्श",
        bestFor: "विदेश में पढ़ाई के इच्छुक छात्र",
        type: "education",
        features: ["विदेश यात्रा योग विश्लेषण", "सफलता के उपाय", "अवसर विश्लेषण", "शैक्षिक सफलता उपाय"],
      },
      "money-leakage": {
        title: "कमाई है लेकिन पैसे नहीं टिकते (Money Leakage Solution)",
        content:
          "कई बार आय तो होती है लेकिन पैसा रुकता नहीं, खर्च या नुकसान हो जाता है। ऐसे में आपकी कुंडली में ग्रह दोष या वास्तु दोष हो सकता है, जिसे सही करके आर्थिक स्थिरता लाई जा सकती है।",
        price: "₹199",
        actualPrice: "₹499",
        cta: "ठीक कराएं",
        deliveryDays: 4,
        deliveryTime: "3-5 दिन",
        format: "ऑनलाइन परामर्श",
        bestFor: "वित्तीय अस्थिरता वाले व्यक्ति",
        type: "business",
        features: ["ग्रहीय दोष विश्लेषण", "वास्तु दोष विश्लेषण", "वित्तीय स्थिरता उपाय", "धन वृद्धि उपाय"],
      },
      "house-yoga": {
        title: "खुद के मकान का योग (Own House Yoga)",
        content:
          "यदि आप खुद का घर खरीदना चाहते हैं लेकिन बार-बार रुकावटें आ रही हैं, तो हम आपकी कुंडली के माध्यम से बताएंगे कि कब और कैसे आप अपना सपना पूरा कर सकते हैं।",
        price: "₹299",
        actualPrice: "₹699",
        cta: "जानिए योग",
        deliveryDays: 1.5,
        deliveryTime: "24-48 घंटे",
        format: "ऑनलाइन परामर्श",
        bestFor: "घर खरीदने के इच्छुक व्यक्ति",
        type: "property",
        features: ["घर खरीदने का शुभ समय", "बाधा निवारण उपाय", "वास्तु अनुकूल घर चयन", "गृह प्रवेश मुहूर्त"],
      },
      "family-solution": {
        title: "परिवारिक समस्याओं का समाधान (Family Problem Solution)",
        content:
          "घर में अशांति, झगड़े, आपसी मतभेद या स्वास्थ्य से जुड़ी पारिवारिक समस्याओं के लिए शांति पूजा, ग्रहों का उपचार और सकारात्मक उपाय प्रदान किए जाते हैं।",
        price: "₹99",
        actualPrice: "₹299",
        cta: "सुलझाएं",
        deliveryDays: 4,
        deliveryTime: "3-5 दिन",
        format: "ऑनलाइन / ऑफलाइन",
        bestFor: "पारिवारिक समस्याओं वाले व्यक्ति",
        type: "relationship",
        features: ["शांति पूजा", "ग्रहीय उपाय", "सकारात्मक उपाय", "पारिवारिक सामंजस्य उपाय"],
      },
    },

    serviceComparison: {
      title: "सेवाओं की तुलना करें",
      subtitle: "अपनी विशिष्ट आवश्यकताओं के लिए सही ज्योतिषीय सेवा हमारी व्यापक तुलना तालिका के साथ खोजें।",
      sortBy: "इसके अनुसार क्रमबद्ध करें",
      filterByType: "प्रकार के अनुसार फ़िल्टर करें",
      allTypes: "सभी प्रकार",
      defaultOrder: "डिफ़ॉल्ट क्रम",
      serviceType: "सेवा प्रकार",
      allServices: "सभी सेवाएँ",
      service: "सेवा",
      price: "मूल्य",
      actualPrice: "वास्तविक मूल्य",
      deliveryTime: "डिलीवरी समय",
      format: "प्रारूप",
      bestFor: "सबसे उपयुक्त",
      type: "प्रकार",
      features: "विशेषताएँ",
      viewDetails: "विवरण देखें",
      hideDetails: "विवरण छिपाएं",
      types: {
        relationship: "रिश्ते",
        business: "व्यापार",
        property: "संपत्ति",
        ritual: "अनुष्ठान",
        remedy: "उपाय",
        education: "शिक्षा",
        all: "सभी",
      },
    },
    faq: {
      categories: {
        general: {
          title: "ज्योतिष के बारे में सामान्य प्रश्न",
          items: {
            whatIsVedic: {
              question: "वैदिक ज्योतिष क्या है?",
              answer:
                "वैदिक ज्योतिष, जिसे ज्योतिष के रूप में भी जाना जाता है, ज्योतिष की एक प्राचीन भारतीय प्रणाली है जो मानव जीवन पर खगोलीय पिंडों के प्रभाव को समझने में मदद करती है। यह निरयन राशि चक्र का उपयोग करता है और कर्म और आध्यात्मिक विकास पर केंद्रित है।",
            },
            howHelp: {
              question: "ज्योतिष मेरी मदद कैसे कर सकता है?",
              answer:
                "ज्योतिष आपके व्यक्तित्व, शक्तियों, कमजोरियों और जीवन पथ में अंतर्दृष्टि प्रदान कर सकता है। यह आपको चुनौतीपूर्ण अवधियों को समझने, सूचित निर्णय लेने, उपयुक्त करियर पथ खोजने और रिश्तों को बेहतर बनाने में मदद कर सकता है।",
            },
            accuracy: {
              question: "ज्योतिषीय भविष्यवाणियां कितनी सटीक होती हैं?",
              answer:
                "ज्योतिषीय भविष्यवाणियां ग्रहों की स्थिति और उनके प्रभावों पर आधारित होती हैं। जबकि वे मूल्यवान अंतर्दृष्टि और मार्गदर्शन प्रदान कर सकते हैं, उन्हें पूर्ण निश्चितताओं के बजाय संभावनाओं के रूप में देखा जाना चाहिए। आपकी नियति को आकार देने में स्वतंत्र इच्छा हमेशा एक भूमिका निभाती है।",
            },
            changeDestiny: {
              question: "क्या ज्योतिष मेरी नियति को बदल सकता है?",
              answer:
                "ज्योतिष आपकी नियति को नहीं बदलता है, लेकिन यह आपको इसे बेहतर ढंग से समझने में मदद करता है। इस ज्ञान के साथ, आप सूचित विकल्प चुन सकते हैं, उपायों के माध्यम से चुनौतियों को कम कर सकते हैं, और अनुकूल अवधियों को अधिकतम कर सकते हैं, प्रभावी ढंग से अपने जीवन पथ को अधिक जागरूकता के साथ नेविगेट कर सकते हैं।",
            },
          },
        },
        consultations: {
          title: "परामर्श के बारे में",
          items: {
            information: {
              question: "परामर्श के लिए मुझे क्या जानकारी चाहिए?",
              answer:
                "सटीक पठन के लिए, आपको अपनी जन्म तिथि, जन्म का सही समय और जन्म स्थान प्रदान करना होगा। यह जानकारी आपकी जन्म कुंडली (कुंडली) बनाने में मदद करती है, जो आपके ज्योतिषीय पठन का आधार है।",
            },
            duration: {
              question: "परामर्श में कितना समय लगता है?",
              answer:
                "एक मानक परामर्श आम तौर पर 30 से 60 मिनट तक चलता है, जो आपके प्रश्नों की जटिलता और आवश्यक विश्लेषण की गहराई पर निर्भर करता है। अनुवर्ती सत्र आमतौर पर छोटे होते हैं।",
            },
            online: {
              question: "क्या आप ऑनलाइन परामर्श प्रदान करते हैं?",
              answer:
                "हां, हम वीडियो कॉल, फोन कॉल या व्हाट्सएप के माध्यम से ऑनलाइन परामर्श प्रदान करते हैं। यह हमारी सेवाओं को दुनिया भर के ग्राहकों के लिए सुलभ बनाता है, जबकि व्यक्तिगत परामर्श के समान गुणवत्ता और सटीकता बनाए रखता है।",
            },
            frequency: {
              question: "मुझे कितनी बार ज्योतिषी से परामर्श करना चाहिए?",
              answer:
                "यह व्यक्तिगत जरूरतों के आधार पर अलग-अलग होता है। कुछ ग्राहक सामान्य पूर्वानुमान के लिए सालाना परामर्श करते हैं, जबकि अन्य प्रमुख जीवन परिवर्तनों या चुनौतीपूर्ण अवधियों के दौरान मार्गदर्शन चाहते हैं। हम आपकी कुंडली की कम से कम वार्षिक समीक्षा की सलाह देते हैं।",
            },
          },
        },
        services: {
          title: "हमारी सेवाएं",
          items: {
            remedies: {
              question: "आप क्या उपाय सुझाते हैं?",
              answer:
                "हम आपकी जन्म कुंडली के आधार पर व्यक्तिगत उपाय सुझाते हैं, जिसमें रत्न, मंत्र, अनुष्ठान, धर्मार्थ गतिविधियाँ और जीवनशैली में बदलाव शामिल हैं। इन उपायों का उद्देश्य नकारात्मक ग्रहों के प्रभावों को कम करना और सकारात्मक लोगों को बढ़ाना है।",
            },
            gemstones: {
              question: "मैं सही रत्न कैसे चुनूं?",
              answer:
                "सही रत्न आपकी जन्म कुंडली और आप पर प्रभाव डालने वाले विशिष्ट ग्रहों के प्रभावों पर निर्भर करता है। हम आपकी अनूठी ज्योतिषीय प्रोफ़ाइल के आधार पर रत्नों को चुनने, शुद्ध करने और पहनने पर विस्तृत मार्गदर्शन प्रदान करते हैं।",
            },
            compatibility: {
              question: "क्या आप विवाह के लिए अनुकूलता की जांच कर सकते हैं?",
              answer:
                "हां, हम व्यापक अनुकूलता विश्लेषण (कुंडली मिलान) प्रदान करते हैं जो रिश्ते की सद्भाव, संभावित चुनौतियों और विवाह के लिए समग्र अनुकूलता को निर्धारित करने के लिए दोनों जन्म चार्ट के विभिन्न पहलुओं की जांच करता है।",
            },
            corporate: {
              question: "क्या आप कॉर्पोरेट ज्योतिष सेवाएं प्रदान करते हैं?",
              answer:
                "हां, हम व्यवसाय समय, साझेदारी विश्लेषण, निवेश मार्गदर्शन और कार्यस्थल सद्भाव आकलन सहित विशेष कॉर्पोरेट ज्योतिष सेवाएं प्रदान करते हैं ताकि व्यवसायों को रणनीतिक निर्णय लेने में मदद मिल सके।",
            },
          },
        },
        practical: {
          title: "व्यावहारिक जानकारी",
          items: {
            payment: {
              question: "आप कौन से भुगतान विधियाँ स्वीकार करते हैं?",
              answer:
                "हम क्रेडिट/डेबिट कार्ड, यूपीआई, बैंक हस्तांतरण और अंतर्राष्ट्रीय ग्राहकों के लिए पेपाल सहित विभिन्न भुगतान विधियाँ स्वीकार करते हैं। सभी भुगतान सुरक्षित और एन्क्रिप्टेड हैं।",
            },
            cancellation: {
              question: "आपकी रद्दीकरण नीति क्या है?",
              answer:
                "हम समझते हैं कि परिस्थितियाँ बदलती हैं। आप बिना किसी शुल्क के निर्धारित समय से 24 घंटे पहले अपनी नियुक्ति को पुनर्निर्धारित या रद्द कर सकते हैं। 24 घंटे से कम सूचना पर रद्द करने पर शुल्क लग सकता है।",
            },
            confidentiality: {
              question: "क्या मेरा परामर्श गोपनीय है?",
              answer:
                "बिल्कुल। हम सभी परामर्शों के लिए सख्त गोपनीयता बनाए रखते हैं। आपकी व्यक्तिगत जानकारी और सत्रों के दौरान चर्चा किए गए विवरण कभी भी तीसरे पक्ष के साथ साझा नहीं किए जाते हैं।",
            },
            languages: {
              question: "आप किन भाषाओं में परामर्श प्रदान करते हैं?",
              answer:
                "हम ग्राहकों की विविध श्रेणी को समायोजित करने और स्पष्ट संचार सुनिश्चित करने के लिए अंग्रेजी, हिंदी और गुजराती में परामर्श प्रदान करते हैं।",
            },
          },
        },
      },
      title: "अक्सर पूछे जाने वाले प्रश्न",
      subtitle: "हमारी ज्योतिष सेवाओं और परामर्श के बारे में सामान्य प्रश्नों के उत्तर पाएं",
      searchPlaceholder: "प्रश्नों की खोज करें...",
      searchAriaLabel: "अक्सर पूछे जाने वाले प्रश्नों की खोज करें",
      tableOfContents: "श्रेणियाँ",
      noResults: "आपकी खोज के लिए कोई परिणाम नहीं मिला",
      clearSearch: "खोज साफ़ करें",
      stillHaveQuestions: "अभी भी प्रश्न हैं?",
      contactPrompt: "जिस उत्तर की आप तलाश कर रहे हैं वह नहीं मिल रहा है? अधिक जानकारी के लिए कृपया हमसे सीधे संपर्क करें।",
      wasThisHelpful: "क्या यह सहायक था?",
      thankYouFeedback: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
      needMoreHelp: "आपकी प्रतिक्रिया के लिए धन्यवाद। यदि आपको अधिक सहायता की आवश्यकता है, तो कृपया हमसे संपर्क करें।",
      relatedQuestions: "संबंधित प्रश्न",
      copyLink: "लिंक कॉपी करें",
      copied: "कॉपी किया गया!",
    },
    disclaimer: {
      title: "अस्वीकरण",
      subtitle: "हमारी सेवाओं और वेबसाइट के बारे में महत्वपूर्ण जानकारी",
      lastUpdated: "अंतिम अपडेट: 9 मई, 2023",
      sections: {
        overview: {
          title: "अवलोकन",
          content:
            "यह अस्वीकरण हमारी वेबसाइट और सेवाओं के आपके उपयोग को नियंत्रित करता है। हमारी वेबसाइट या सेवाओं का उपयोग करके, आप इस अस्वीकरण को पूरी तरह से स्वीकार करते हैं। यदि आप इस अस्वीकरण के किसी भी हिस्से से असहमत हैं, तो आपको हमारी वेबसाइट या सेवाओं का उपयोग नहीं करना चाहिए।",
        },
        astrologicalServices: {
          title: "ज्योतिषीय सेवाएं",
          content:
            "इस वेबसाइट के माध्यम से प्रदान की जाने वाली ज्योतिषीय सेवाएं, पठन और भविष्यवाणियां केवल मनोरंजन और सूचनात्मक उद्देश्यों के लिए हैं। हालांकि हम सटीक और अंतर्दृष्टिपूर्ण जानकारी प्रदान करने का प्रयास करते हैं, ज्योतिष एक सटीक विज्ञान नहीं है, और परिणाम भिन्न हो सकते हैं। हम हमारी ज्योतिषीय सलाह या उपायों का पालन करने से विशिष्ट परिणामों या परिणामों की गारंटी नहीं देते हैं।",
        },
        externalLinks: {
          title: "बाहरी लिंक",
          content:
            "हमारी वेबसाइट में बाहरी वेबसाइटों के लिंक हो सकते हैं जो हमारे द्वारा प्रदान या बनाए नहीं गए हैं। हम इन बाहरी वेबसाइटों पर किसी भी जानकारी की सटीकता, प्रासंगिकता, समयबद्धता या पूर्णता की गारंटी नहीं देते हैं।",
        },
        privacy: {
          title: "गोपनीयता",
          content:
            "कृपया हमारी गोपनीयता नीति देखें जिसमें बताया गया है कि हम आपकी व्यक्तिगत जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करते हैं।",
        },
        changes: {
          title: "अस्वीकरण में परिवर्तन",
          content:
            "हम समय-समय पर बिना सूचना के इस अस्वीकरण को अपडेट कर सकते हैं। इस अस्वीकरण में किसी भी परिवर्तन के बाद हमारी वेबसाइट और सेवाओं का उपयोग जारी रखकर, आप संशोधित अस्वीकरण से बाध्य होने के लिए सहमत होते हैं।",
        },
        contact: {
          title: "संपर्क जानकारी",
          content:
            "यदि आपके पास इस अस्वीकरण के बारे में कोई प्रश्न हैं, तो कृपया हमारी वेबसाइट पर दी गई संपर्क जानकारी के माध्यम से हमसे संपर्क करें।",
        },
        governingLaw: {
          title: "शासी कानून",
          content:
            "यह अस्वीकरण भारत के कानूनों के अनुसार शासित और व्याख्या की जाती है, और इस अस्वीकरण से संबंधित कोई भी विवाद भारत के न्यायालयों के विशेष अधिकार क्षेत्र के अधीन होगा।",
        },
      },
      tableOfContents: "विषय-सूची",
      backToTop: "वापस शीर्ष पर जाएं",
    },
  },
}