// OVK ID Landscape Map - Data Partner Konfigurationsdaten

if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.dataPartners) {
  window.OVK_LANDSCAPE_CONFIG.dataPartners = [];
}

window.OVK_LANDSCAPE_CONFIG.dataPartners.push(
  {
    id: "iq_data",
    name: "IQ digital data",
    description: "Daten von IQ digital",
    supportedIds: ["utiq"],
    supportedDSPs: ["ttd", "adform", "active_agent"],
    supportedSSPs: ["pubmatic", "index_exchange"]
  },
  {
    id: "bcn_data",
    name: "BCN Data",
    description: "Vermarktereigene Datensegmente des Burda Community Network.",
    supportedIds: ["utiq"],
    supportedDSPs: ["ttd", "active_agent" ],
    supportedSSPs: ["index_exchange", "magnite"]
  },
  
  {
    id: "uim_data",
    name: "United Internet Media (Data)",
    description: "E-Commerce- und Profil-Datensegmente von WEB.DE & GMX.",
    supportedIds: ["netid"],
    supportedDSPs: ["ttd", "adform", "active_agent"],
    supportedSSPs: ["pubmatic", "xandr"]
  }
);
