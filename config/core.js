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
        "adform",
        "sroerssp"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ],
      supportedVermarkter: []
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
        "adform",
        "sroerssp"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ],
      supportedVermarkter: []
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
        "adform",
        "sroerssp"
      ],
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ],
      supportedVermarkter: []
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
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ],
      supportedVermarkter: []
    },
    {
      id: "pubmatic",
      name: "PubMatic",
      category: "curation",
      supportedUsecases: [],
      supportedIds: [
        "utiq"
      ]
    },
    {
      id: "index_exchange",
      name: "Index Exchange",
      category: "curation",
      supportedUsecases: [],
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
      supportedIds: [
        "utiq",
        "netid_utiq",
        "netid"
      ]
    },
    {
      id: "sroerssp",
      name: "Ströer SSP",
      category: "standard",
      supportedUsecases: [
        "targeting_pre"
      ],
      supportedVermarkter: [
        "stroeer"
      ],
      supportedIds: [
        "utiq"
      ]
    }
  ]
};

// Für Node.js CommonJS-Umgebung (Validierung)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.OVK_LANDSCAPE_CONFIG;
}
