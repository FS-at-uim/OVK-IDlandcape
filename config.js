// OVK ID Landscape Map - Konfigurationsdaten
// Einfach zu erweitern und anzupassen.

const OVK_LANDSCAPE_CONFIG = {
  // 1. Stufe: Usecases (Vorfilter)
  usecases: [
    {
      id: "fc",
      name: "Frequency Capping",
      description: "Kampagnenübergreifende Frequenzbegrenzung ohne Third-Party-Cookies."
    },
    {
      id: "targeting",
      name: "Targeting",
      description: "Zielgruppenspezifische Ansprache basierend auf ID-Lösungen."
    }
  ],

  // 2. Stufe: DSP (Demand Side Platforms)
  dsps: [
    {
      id: "ttd",
      name: "The Trade Desk",
      logo: "TTD",
      supportedUsecases: ["fc", "targeting"],
      supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr", "yieldlab", "smartclip"],
      supportedVermarkter: ["ad_alliance", "seven_one_media", "media_impact", "uim", "iqd"]
    },
    {
      id: "active_agent",
      name: "Active Agent",
      logo: "AA",
      supportedUsecases: ["targeting"],
      supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr", "yieldlab", "smartclip"],
      supportedVermarkter: ["ad_alliance", "media_impact", "stroeer", "uim", "iqd"]
    },
    {
      id: "adform",
      name: "Adform",
      logo: "AD",
      supportedUsecases: ["fc"],
      supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr", "yieldlab", "smartclip"],
      supportedVermarkter: ["media_impact", "seven_one_media", "uim"]
    },
    {
      id: "dv360",
      name: "DV360",
      logo: "DV360",
      supportedUsecases: [],
      supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr", "yieldlab"],
      supportedVermarkter: ["media_impact", "seven_one_media", "uim", "iqd", "ad_alliance"]  
    }
  ],

  // 3. Stufe: SSP (Supply Side Platforms)
  ssps: [
    {
      id: "pubmatic",
      name: "PubMatic",
      category: "curation",
      supportedUsecases: ["fc", "targeting"],
      supportedVermarkter: ["ad_alliance", "seven_one_media", "uim"]
    },
    {
      id: "index_exchange",
      name: "Index Exchange",
      category: "curation",
      supportedUsecases: ["targeting"],
      supportedVermarkter: ["ad_alliance", "media_impact", "seven_one_media", "uim", "iqd"]
    },
    {
      id: "magnite",
      name: "Magnite",
      category: "curation",
      supportedUsecases: ["targeting"],
      supportedVermarkter: ["seven_one_media", "stroeer", "uim"]
    },
    {
      id: "xandr",
      name: "Xandr",
      category: "curation",
      supportedUsecases: ["targeting"],
      supportedVermarkter: ["media_impact", "stroeer", "uim", "iqd"]
    },
    {
      id: "yieldlab",
      name: "Yieldlab",
      category: "standard",
      supportedVermarkter: ["media_impact", "stroeer", "uim", "iqd"]
    },
    {
      id: "smartclip",
      name: "Smartclip",
      category: "standard",
      supportedVermarkter: ["ad_alliance"]
    }
  ],

  // 4. Stufe: Vermarkter
  vermarkter: [
    {
      id: "ad_alliance",
      name: "Ad Alliance",
      description: "Vermarkter von RTL Deutschland, Gruner + Jahr etc."
    },
    {
      id: "media_impact",
      name: "Media Impact",
      description: " Vermarkter von Axel Springer."
    },
    {
      id: "seven_one_media",
      name: "Seven.One Media",
      description: "Vermarkter der ProSiebenSat.1 Media SE."
    },
    {
      id: "stroeer",
      name: "Ströer",
      description: "Vermarkter für Out-of-Home und digitale Medien."
    }
,
    {
      id: "uim",
      name: "United Internet Media",
      description: "Vermarkter für Web.de und GMX."
    }
,
    {
      id: "iqd",
      name: "IQ Digital Media",
      description: "Vermarkter für IQ Digital Media."
    }
  ],

  // 5. Stufe: Publisher (einem Vermarkter zugeordnet)
  publishers: [
    // Ad Alliance
    { id: "rtl", name: "RTL.de", vermarkterId: "ad_alliance" },
    { id: "ntv", name: "n-tv.de", vermarkterId: "ad_alliance" },
    { id: "stern", name: "stern.de", vermarkterId: "ad_alliance" },

    // Media Impact
    { id: "bild", name: "Bild.de", vermarkterId: "media_impact" },
    { id: "welt", name: "Welt.de", vermarkterId: "media_impact" },
    { id: "business_insider", name: "Business Insider", vermarkterId: "media_impact" },

    // Seven.One Media
    { id: "prosieben", name: "ProSieben.de", vermarkterId: "seven_one_media" },
    { id: "sat1", name: "Sat1.de", vermarkterId: "seven_one_media" },
    { id: "joyn", name: "Joyn.de", vermarkterId: "seven_one_media" },

    // Ströer
    { id: "tonline", name: "t-online.de", vermarkterId: "stroeer" },
    { id: "watson", name: "watson.de", vermarkterId: "stroeer" },
    { id: "giga", name: "giga.de", vermarkterId: "stroeer" },

    // United Internet Media
    { id: "webde", name: "Web.de", vermarkterId: "uim" },
    { id: "gmx", name: "GMX.de", vermarkterId: "uim" },

    // IQ Digital Media
    { id: "zeit", name: "Zeit.de", vermarkterId: "iqd" },
    { id: "faz", name: "Faz.net", vermarkterId: "iqd" },
    { id: "harper_collins", name: "Harper Collins", vermarkterId: "iqd" }

  ]
};

// Exportieren für die Verwendung in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OVK_LANDSCAPE_CONFIG;
}
