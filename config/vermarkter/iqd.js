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
    { type: "desktop", coverage: 95 },
    { type: "mobile", coverage: 90 }
  ],
  supportedIds: ["utiq"]
});
