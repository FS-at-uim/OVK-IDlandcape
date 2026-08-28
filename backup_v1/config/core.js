// OVK ID Landscape Map - Core Konfigurationsdaten
// IDs, Usecases, DSPs, SSPs

window.OVK_LANDSCAPE_CONFIG = {
  ids: [
    {
      id: "utiq",
      name: "Utiq",
      shortName: "Utiq",
      color: "#fde8e8",
      textColor: "#c81e1e",
      description: "Telco-basiertes ID-System für sicheres Consent-Targeting."
    },
    {
      id: "netid_utiq",
      name: "netID via Utiq",
      shortName: "netID via Utiq",
      color: "#e6f4ea",
      textColor: "#137333",
      description: "Targeting über das Utiq-Netzwerk unter Nutzung von netID-Daten."
    },
    {
      id: "netid",
      name: "netID",
      shortName: "netID",
      color: "#e6f4ea",
      textColor: "#137333",
      description: "Direktes, konsensbasiertes Login- und ID-System der European netID Foundation."
    }
  ],
  usecases: [
    {
      id: "fc",
      name: "Frequency Capping",
      description: "Kampagnenübergreifende Frequenzbegrenzung ohne Third-Party-Cookies."
    },
    {
      id: "targeting",
      name: "Targeting (Data Partner)",
      description: "Zielgruppenspezifische Ansprache basierend auf ID-Lösungen."
    },
    {
      id: "targeting_pre",
      name: "Targeting (Pretargeted Pub. Deals)",
      description: "Pre-Targeting auf Publisher-Seite (und Signalisierung ID der ID-Lösung) gesteuert durch die SSP."
    }
  ],
  dsps: [
    {
      id: "ttd",
      name: "The Trade Desk",
      logo: "TTD",
      supportedUsecases: [
        "fc",
        "targeting",
        "targeting_pre"
      ],
      supportedSSPs: [
        "equativ",
        "pubmatic",
        "index_exchange",
        "magnite",
        "xandr",
        "yieldlab",
        "smartclip",
        "adform"
      ],
      supportedVermarkter: [
        "ad_alliance",
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "score",
        "seven_one_media",
        "stroeer",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "active_agent",
      name: "Active Agent",
      logo: "AA",
      supportedUsecases: [
        "fc",
        "targeting",
        "targeting_pre"
      ],
      supportedSSPs: [
        "equativ",
        "pubmatic",
        "index_exchange",
        "magnite",
        "xandr",
        "yieldlab",
        "smartclip",
        "adform"
      ],
      supportedVermarkter: [
        "ad_alliance",
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "score",
        "seven_one_media",
        "stroeer",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "adform",
      name: "Adform",
      logo: "AD",
      supportedUsecases: [
        "fc",
        "targeting",
        "targeting_pre"
      ],
      supportedSSPs: [
        "equativ",
        "pubmatic",
        "index_exchange",
        "magnite",
        "xandr",
        "yieldlab",
        "smartclip",
        "adform"
      ],
      supportedVermarkter: [
        "ad_alliance",
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "score",
        "seven_one_media",
        "stroeer",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "dv360",
      name: "DV360",
      logo: "DV360",
      supportedUsecases: [
        "targeting_pre"
      ],
      supportedSSPs: [
        "equativ",
        "pubmatic",
        "index_exchange",
        "magnite",
        "xandr",
        "yieldlab",
        "smartclip",
        "adform"
      ],
      supportedVermarkter: [
        "ad_alliance",
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "score",
        "seven_one_media",
        "stroeer",
        "uim",
        "visoon"
      ],
      supportedIds: []
    }
  ],
  ssps: [
    {
      id: "equativ",
      name: "Equativ",
      category: "curation",
      supportedUsecases: [
        "fc",
        "targeting",
        "targeting_pre"
      ],
      supportedVermarkter: [
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "score",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "pubmatic",
      name: "PubMatic",
      category: "curation",
      supportedUsecases: [],
      supportedVermarkter: [
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "score",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq"
      ]
    },
    {
      id: "index_exchange",
      name: "Index Exchange",
      category: "curation",
      supportedUsecases: [],
      supportedVermarkter: [
        "bcn",
        "funke",
        "iqd",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq"
      ]
    },
    {
      id: "magnite",
      name: "Magnite",
      category: "curation",
      supportedUsecases: [
        "targeting_pre"
      ],
      supportedVermarkter: [
        "bcn",
        "funke",
        "iqd",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "xandr",
      name: "Xandr",
      category: "curation",
      supportedUsecases: [
        "targeting_pre"
      ],
      supportedVermarkter: [
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "yieldlab",
      name: "Yieldlab",
      category: "standard",
      supportedUsecases: [
        "targeting_pre"
      ],
      supportedVermarkter: [
        "ad_alliance",
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "seven_one_media",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "smartclip",
      name: "Smartclip",
      category: "standard",
      supportedVermarkter: [
        "ad_alliance",
        "bcn",
        "funke"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq"
      ],
      supportedUsecases: [
        "targeting_pre"
      ]
    },
    {
      id: "adform",
      name: "Adform",
      category: "standard",
      supportedUsecases: [
        "targeting_pre"
      ],
      supportedVermarkter: [
        "bcn",
        "funke",
        "iqd",
        "media_impact",
        "score",
        "stroeer",
        "uim",
        "visoon"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    }
  ]
};

// Für Node.js CommonJS-Umgebung (Validierung)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.OVK_LANDSCAPE_CONFIG;
}
