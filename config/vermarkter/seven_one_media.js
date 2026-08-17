if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "seven_one_media",
  name: "Seven.One Media",
  description: "Vermarkter der ProSiebenSat.1 Media SE.",
  supportedInventoryTypes: [
    { type: "desktop", coverage:  60},
    { type: "mobile", coverage:  60},
    { type: "ctv", coverage:  60},
    { type: "app", coverage: 60}
  ],
  supportedIds: [
    { id: "netid_utiq", coverage: 60 }
  ]
});
