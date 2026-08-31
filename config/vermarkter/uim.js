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
          coverage: 69,
          excludedDSPs: []
        },
        {
          id: "netid",
          coverage: 82,
          excludedDSPs: []
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 76,
          excludedDSPs: []
        },
        {
          id: "netid",
          coverage: 97,
          excludedDSPs: []
        }
      ]
    },
    {
      type: "app",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 67,
          excludedDSPs: []
        },
        {
          id: "netid",
          coverage: 94,
          excludedDSPs: []
        }
      ]
    }
  ],
  supportedSSPs: [
    "equativ",
    "pubmatic",
    "index_exchange",
    "magnite",
    "xandr",
    "yieldlab",
    "adform"
  ]
});
