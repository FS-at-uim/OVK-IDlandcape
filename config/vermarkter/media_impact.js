if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "media_impact",
  name: "Media Impact",
  description: " Vermarkter von Axel Springer.",
  publishers: [
    { id: "bild", name: "Bild.de", supportedInventoryTypes: ["desktop", "mobile", "app", "ctv"], supportedIds: ["utiq", "netid_utiq", "netid"] },
    { id: "welt", name: "Welt.de", supportedInventoryTypes: ["desktop", "mobile", "app"], supportedIds: ["utiq", "netid_utiq", "netid"] },
    { id: "business_insider", name: "Business Insider", supportedInventoryTypes: ["desktop", "mobile"], supportedIds: ["utiq", "netid_utiq", "netid"] }
  ]
});
