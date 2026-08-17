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
  supportedInventoryTypes: [
    { type: "desktop", coverage: 20},
    { type: "mobile", coverage:  20}
  ],
  supportedIds: [
    { id: "utiq", coverage: 20 }
  ]
});
