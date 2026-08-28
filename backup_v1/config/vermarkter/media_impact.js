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
          id: "utiq"
        },
        {
          id: "netid"
        },
        {
          id: "netid_utiq"
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq"
        },
        {
          id: "netid"
        },
        {
          id: "netid_utiq"
        }
      ]
    },
    {
      type: "app",
      supportedIds: [
        {
          id: "utiq"
        },
        {
          id: "netid"
        },
        {
          id: "netid_utiq"
        }
      ]
    }
  ]
});