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
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq",
          excludedDSPs: []
        },
        {
          id: "netid",
          excludedDSPs: []
        },
        {
          id: "netid_utiq",
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
        },
        {
          id: "netid",
          excludedDSPs: []
        },
        {
          id: "netid_utiq",
          excludedDSPs: []
        }
      ]
    },
    {
      type: "app",
      supportedIds: [
        {
          id: "utiq",
          excludedDSPs: []
        },
        {
          id: "netid",
          excludedDSPs: []
        },
        {
          id: "netid_utiq",
          excludedDSPs: []
        }
      ]
    }
  ],
  supportedSSPs: [
    "equativ",
    "pubmatic",
    "xandr",
    "yieldlab",
    "adform"
  ]
});