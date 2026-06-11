// OVK ID Landscape Map - Data Partner Konfigurationsdaten

if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.dataPartners) {
  window.OVK_LANDSCAPE_CONFIG.dataPartners = [];
}

window.OVK_LANDSCAPE_CONFIG.dataPartners.push(
  {
    id: "rtl_data",
    name: "RTL Data (Ad Alliance)",
    description: "Vermarktereigene Datensegmente der Ad Alliance.",
    supportedIds: ["utiq"],
    supportedDSPs: ["ttd"],
    supportedSSPs: ["pubmatic"]
  },
  {
    id: "seven_one_data",
    name: "Seven.One Data",
    description: "Vermarktereigene Datensegmente der Seven.One Entertainment Group.",
    supportedIds: ["netid"],
    supportedDSPs: ["ttd", "active_agent"],
    supportedSSPs: ["index_exchange"]
  },
  {
    id: "otto_media",
    name: "Otto Group Media",
    description: "Hochwertige Retail-Datensegmente der Otto Group.",
    supportedIds: ["utiq", "netid"],
    supportedDSPs: ["ttd", "adform"],
    supportedSSPs: ["pubmatic", "index_exchange"]
  },
  {
    id: "uim_data",
    name: "United Internet Media (Data)",
    description: "E-Commerce- und Profil-Datensegmente von WEB.DE & GMX.",
    supportedIds: ["netid"],
    supportedDSPs: ["ttd", "adform", "active_agent"],
    supportedSSPs: ["pubmatic", "index_exchange"]
  }
);
