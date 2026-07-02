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
    { type: "desktop", coverage: 85 },
    { type: "mobile", coverage: 80 },
    { type: "app", coverage: 75 },
    { type: "ctv", coverage: 60 }
  ],
  supportedIds: [
    { id: "utiq", coverage: 85 },
    { id: "netid_utiq", coverage: 65 },
    { id: "netid", coverage: 60 }
  ]
});
