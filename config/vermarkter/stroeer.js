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
    { type: "desktop", coverage: 95 },
    { type: "mobile", coverage: 90 },
    { type: "app", coverage: 60 }
  ],
  supportedIds: [
    { id: "utiq", coverage: 80 }
  ]
});
