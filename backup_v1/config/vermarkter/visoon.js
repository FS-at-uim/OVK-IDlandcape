if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "visoon",
  name: "Visoon Video Impact GmbH",
  description: "Visoon Video Impact - TV & Streaming (Axel Springer & Paramount)",
  supportedInventoryTypes: [
    {
      type: "ctv",
      supportedIds: [
        {
          id: "utiq",
          coverage: 70
        }
      ]
    }
  ]
});