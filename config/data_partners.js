// OVK ID Landscape Map - Data Partner Konfigurationsdaten

if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}

window.OVK_LANDSCAPE_CONFIG.dataPartners = [
  {
    id: "iq_data",
    name: "iq digital media marketing GmbH",
    description: "Datensegmente von iq digital media marketing GmbH",
    supportedIds: [
      "utiq"
    ],
    supportedDSPs: [
      "ttd",
      "active_agent",
      "adform"
    ],
    supportedSSPs: [
      "equativ",
      "xandr"
    ]
  },
  {
    id: "bcn_data",
    name: "BCN Brand Community Network",
    description: "Datensegmente des Burda Community Network.",
    supportedIds: [
      "utiq"
    ],
    supportedDSPs: [
      "active_agent"
    ],
    supportedSSPs: [
      "index_exchange"
    ]
  },
  {
    id: "uim_data",
    name: "United Internet Media (Data)",
    description: "E-Commerce- und Profil-Datensegmente von WEB.DE & GMX.",
    supportedIds: [
      "netid_utiq",
      "netid"
    ],
    supportedDSPs: [
      "ttd",
      "active_agent",
      "adform"
    ],
    supportedSSPs: [
      "equativ",
      "pubmatic",
      "xandr"
    ]
  },
  {
    id: "osds",
    name: "Ströer / OS data solutions",
    description: "Datensegmente von Ströer / OS data solutions",
    supportedIds: [
      "utiq"
    ],
    supportedDSPs: [
      "ttd",
      "active_agent",
      "adform"
    ],
    supportedSSPs: []
  }
];

// Für Node.js CommonJS-Umgebung (Validierung)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.OVK_LANDSCAPE_CONFIG.dataPartners;
}
