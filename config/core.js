// OVK ID Landscape Map - Core Konfigurationsdaten
// IDs, Usecases, DSPs, SSPs

window.OVK_LANDSCAPE_CONFIG = {
  // ID-Definitionen (Erweiterbar)
  ids: [
    { id: "utiq", name: "Utiq", shortName: "Utiq", color: "#fde8e8", textColor: "#c81e1e", description: "Telekom-basiertes ID-System für sicheres Consent-Targeting." },
    { id: "netid_utiq", name: "netID via Utiq", shortName: "netID / Utiq", color: "#e6f4ea", textColor: "#137333", description: "Targeting über das Utiq-Netzwerk unter Nutzung von netID-Daten." },
    { id: "netid", name: "netID", shortName: "netID", color: "#e6f4ea", textColor: "#137333", description: "Direktes, konsensbasiertes Login- und ID-System der European netID Foundation." }
  ],

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
      supportedVermarkter: ["ad_alliance", "seven_one_media", "media_impact", "uim", "iqd"],
      supportedIds: ["utiq", "netid_utiq", "netid"]
    },
    {
      id: "active_agent",
      name: "Active Agent",
      logo: "AA",
      supportedUsecases: ["targeting"],
      supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr", "yieldlab", "smartclip"],
      supportedVermarkter: ["ad_alliance", "media_impact", "stroeer", "uim", "iqd"],
      supportedIds: ["utiq", "netid_utiq", "netid"]
    },
    {
      id: "adform",
      name: "Adform",
      logo: "AD",
      supportedUsecases: ["fc"],
      supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr", "yieldlab", "smartclip"],
      supportedVermarkter: ["media_impact", "seven_one_media", "uim"],
      supportedIds: ["utiq", "netid_utiq", "netid"]
    },
    {
      id: "dv360",
      name: "DV360",
      logo: "DV360",
      supportedUsecases: [],
      supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr", "yieldlab"],
      supportedVermarkter: ["media_impact", "seven_one_media", "uim", "iqd", "ad_alliance"],
      supportedIds: []
    }
  ],

  // 3. Stufe: SSP (Supply Side Platforms)
  ssps: [
    {
      id: "pubmatic",
      name: "PubMatic",
      category: "curation",
      supportedUsecases: ["fc", "targeting"],
      supportedVermarkter: ["ad_alliance", "seven_one_media", "uim"],
      supportedIds: ["utiq", "netid_utiq"]
    },
    {
      id: "index_exchange",
      name: "Index Exchange",
      category: "curation",
      supportedUsecases: ["targeting"],
      supportedVermarkter: ["ad_alliance", "media_impact", "seven_one_media", "uim", "iqd"],
      supportedIds: ["utiq", "netid_utiq"]
    },
    {
      id: "magnite",
      name: "Magnite",
      category: "curation",
      supportedUsecases: ["targeting"],
      supportedVermarkter: ["seven_one_media", "stroeer", "uim"],
      supportedIds: ["utiq", "netid_utiq"]
    },
    {
      id: "xandr",
      name: "Xandr",
      category: "curation",
      supportedUsecases: ["targeting"],
      supportedVermarkter: ["media_impact", "stroeer", "uim", "iqd"],
      supportedIds: ["netid"]
    },
    {
      id: "yieldlab",
      name: "Yieldlab",
      category: "standard",
      supportedVermarkter: ["media_impact", "stroeer", "uim", "iqd"],
      supportedIds: []
    },
    {
      id: "smartclip",
      name: "Smartclip",
      category: "standard",
      supportedVermarkter: ["ad_alliance"],
      supportedIds: []
    }
  ],
  dataPartners: []
};

// Für Node.js CommonJS-Umgebung (Validierung)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.OVK_LANDSCAPE_CONFIG;
}
