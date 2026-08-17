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
  supportedInventoryTypes: [
    { type: "desktop", coverage:  0},
    { type: "mobile", coverage:  0}
  ],
  supportedIds: [
    { id: "utiq", coverage:  0}
  ]
});
