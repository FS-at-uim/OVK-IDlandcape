if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "visoon",
  name: "Visoon Video Impact",
  description: "Visoon Video Impact.",
  supportedInventoryTypes: [
    { type: "ctv", coverage:  50}
  ],
  supportedIds: [
    { id: "utiq", coverage:  50}
  ]
});
