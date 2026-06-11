if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "stroeer",
  name: "Ströer",
  description: "Vermarkter für Out-of-Home und digitale Medien.",
  publishers: [
    { id: "tonline", name: "t-online.de", supportedInventoryTypes: ["desktop", "mobile"], supportedIds: [] },
    { id: "watson", name: "watson.de", supportedInventoryTypes: ["desktop", "mobile"], supportedIds: ["utiq"] },
    { id: "giga", name: "giga.de", supportedInventoryTypes: ["desktop", "mobile", "app"], supportedIds: [] }
  ]
});
