if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "uim",
  name: "United Internet Media",
  description: "Mediavermarkter der konzerneigenen Mail-Portale WEB.DE und GMX",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 67
        },
        {
          id: "netid",
          coverage: 82
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 76
        },
        {
          id: "netid",
          coverage: 97
        }
      ]
    },
    {
      type: "app",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 67
        },
        {
          id: "netid",
          coverage: 94
        }
      ]
    }
  ]
});