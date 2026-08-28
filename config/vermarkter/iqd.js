if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "iqd",
  name: "iq digital media marketing GmbH",
  description: " ",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq",
          excludedDSPs: []
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq",
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