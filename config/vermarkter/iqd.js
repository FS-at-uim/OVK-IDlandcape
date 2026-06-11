if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "iqd",
  name: "IQ Digital Media",
  description: "Vermarkter für IQ Digital Media.",
  publishers: [
    { id: "zeit", name: "Zeit.de", supportedInventoryTypes: ["desktop", "mobile"], supportedIds: ["utiq"] },
    { id: "faz", name: "Faz.net", supportedInventoryTypes: ["desktop", "mobile"], supportedIds: ["utiq"] },
    { id: "harper_collins", name: "Harper Collins", supportedInventoryTypes: ["desktop", "mobile"], supportedIds: [] }
  ]
});
