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
  supportedInventoryTypes: [
    { type: "desktop", coverage: 0},
    { type: "mobile", coverage:  0},
    { type: "app", coverage:  0}
  ],
  supportedIds: [
    { id: "utiq", coverage:  0},
    { id: "netid", coverage:  0}
  ]
});
// neu