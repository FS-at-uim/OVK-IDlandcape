if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "score",
  name: "Score Media Group",
  description: "Score Media Group.",
  supportedInventoryTypes: [
    { type: "desktop", coverage:  16},
    { type: "mobile", coverage:  16}
  ],
  supportedIds: [
    { id: "utiq", coverage:  16}
  ]
});
