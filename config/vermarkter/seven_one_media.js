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
    { type: "desktop", coverage: 80 },
    { type: "mobile", coverage: 75 },
    { type: "ctv", coverage: 90 },
    { type: "app", coverage: 65 }
  ],
  supportedIds: ["utiq", "netid_utiq"]
});
