// OVK ID Landscape Map - Application Logic

document.addEventListener("DOMContentLoaded", () => {
  // Global State - Selections for each of the 5 stages
  let selectedUsecaseId = null;
  let selectedDspId = null;
  let selectedSspId = null;
  let selectedVermarkterId = null;
  let selectedPublisherId = null;

  // DOM Elements
  const listUsecases = document.getElementById("list-usecases");
  const listDsps = document.getElementById("list-dsps");
  const listSsps = document.getElementById("list-ssps");
  const listVermarkters = document.getElementById("list-vermarkters");
  const listPublishers = document.getElementById("list-publishers");
  
  const activeChipsContainer = document.getElementById("active-chips");
  const btnReset = document.getElementById("btn-reset");
  
  const detailDrawer = document.getElementById("detail-drawer");
  const drawerTitle = document.getElementById("drawer-title");
  const drawerContent = document.getElementById("drawer-content");
  const btnCloseDrawer = document.getElementById("btn-close-drawer");

  // Initialisierung
  init();

  function init() {
    renderAll();
    setupEventListeners();
    updateFiltering();
  }

  // --- Dynamic Rendering ---

  function renderAll() {
    renderUsecases();
    renderDsps();
    renderSsps();
    renderVermarkters();
    renderPublishers();
  }

  function renderUsecases() {
    listUsecases.innerHTML = "";
    OVK_LANDSCAPE_CONFIG.usecases.forEach(item => {
      const card = createCard(item.id, item.name, item.description, "usecase");
      listUsecases.appendChild(card);
    });
  }

  function renderDsps() {
    listDsps.innerHTML = "";
    OVK_LANDSCAPE_CONFIG.dsps.forEach(item => {
      const card = createCard(item.id, item.name, "", "dsp");
      listDsps.appendChild(card);
    });
  }

  function renderSsps() {
    listSsps.innerHTML = "";
    
    // Group SSPs by category (Standard vs Curation)
    const categories = [
      { id: "standard", name: "Standard SSP", description: "ID wird nur durchgereicht" },
      { id: "curation", name: "Curation SSP", description: "FC & Targeting möglich" }
    ];
    
    categories.forEach(cat => {
      const groupHeader = document.createElement("div");
      groupHeader.className = "ssp-group-header";
      groupHeader.setAttribute("data-group-category", cat.id);
      groupHeader.innerHTML = `${cat.name} <span class="ssp-group-subtitle">(${cat.description})</span>`;
      listSsps.appendChild(groupHeader);
      
      const catSsps = OVK_LANDSCAPE_CONFIG.ssps.filter(s => s.category === cat.id);
      catSsps.forEach(item => {
        const card = createCard(item.id, item.name, "", "ssp");
        
        // Show usecases as subtext ONLY for Curation SSPs (where usecases are actively steered)
        if (item.category === "curation") {
          const ucNames = item.supportedUsecases.map(uid => {
            const uc = OVK_LANDSCAPE_CONFIG.usecases.find(u => u.id === uid);
            return uc ? uc.name : uid;
          }).join(", ");
          card.innerHTML += `<div class="partner-card-desc">Usecases: ${ucNames}</div>`;
        }
        
        listSsps.appendChild(card);
      });
    });
  }

  function renderVermarkters() {
    listVermarkters.innerHTML = "";
    OVK_LANDSCAPE_CONFIG.vermarkter.forEach(item => {
      const card = createCard(item.id, item.name, item.description, "vermarkter");
      listVermarkters.appendChild(card);
    });
  }

  function renderPublishers() {
    listPublishers.innerHTML = "";
    
    // Group publishers by Vermarkter for better representation of n:1 relationship
    OVK_LANDSCAPE_CONFIG.vermarkter.forEach(v => {
      const groupHeader = document.createElement("div");
      groupHeader.className = "publisher-group-header";
      groupHeader.setAttribute("data-group-vermarkter", v.id);
      groupHeader.textContent = v.name;
      listPublishers.appendChild(groupHeader);

      const vPublishers = OVK_LANDSCAPE_CONFIG.publishers.filter(p => p.vermarkterId === v.id);
      vPublishers.forEach(item => {
        const card = createCard(item.id, item.name, "", "publisher");
        card.setAttribute("data-vermarkter-id", item.vermarkterId);
        
        // Add inventory type icons behind name
        if (item.supportedInventoryTypes && item.supportedInventoryTypes.length > 0) {
          const h3 = card.querySelector("h3");
          if (h3) {
            const iconsSpan = document.createElement("span");
            iconsSpan.className = "publisher-inventory-types";
            item.supportedInventoryTypes.forEach(type => {
              const iconWrapper = getInventoryTypeIcon(type);
              if (iconWrapper) {
                iconsSpan.appendChild(iconWrapper);
              }
            });
            h3.appendChild(iconsSpan);
          }
        }
        
        listPublishers.appendChild(card);
      });
    });
  }

  function getInventoryTypeIcon(type) {
    const wrapper = document.createElement("span");
    wrapper.className = `inventory-icon-wrapper icon-${type}`;
    
    let svgContent = "";
    let tooltip = "";
    
    switch (type) {
      case "ctv":
        tooltip = "CTV (Big Screen)";
        svgContent = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="13" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`;
        break;
      case "app":
        tooltip = "App Nativ (Display, Native, OLV)";
        svgContent = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`;
        break;
      case "desktop":
        tooltip = "Desktop Web (Display, Native, OLV)";
        svgContent = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
        break;
      case "mobile":
        tooltip = "Mobile Web / Wrapper Apps (Display, Native, OLV)";
        svgContent = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
        break;
    }
    
    wrapper.innerHTML = svgContent;
    wrapper.setAttribute("title", tooltip);
    return wrapper;
  }

  // Card element helper creator
  function createCard(id, name, description, stageType) {
    const card = document.createElement("div");
    card.className = "partner-card";
    card.setAttribute("data-id", id);
    card.setAttribute("data-type", stageType);
    
    card.innerHTML = `<h3>${name}</h3>`;
    if (description) {
      card.innerHTML += `<div class="partner-card-desc">${description}</div>`;
    }

    card.addEventListener("click", (e) => {
      e.stopPropagation();
      handleCardClick(id, stageType);
    });

    return card;
  }

  // --- Interaction & Event Handling ---

  function setupEventListeners() {
    // Reset Button
    btnReset.addEventListener("click", resetFilters);

    // Close Drawer
    btnCloseDrawer.addEventListener("click", closeDrawer);
  }

  function handleCardClick(id, type) {
    // Show details in the drawer
    showDetails(id, type);

    // Check if clicked card is inactive (if so, ignore click)
    const cardEl = document.querySelector(`.partner-card[data-type="${type}"][data-id="${id}"]`);
    if (cardEl && cardEl.classList.contains("inactive")) {
      return;
    }

    // Toggle filter selection (selecting one deselects others in the same stage)
    if (type === "usecase") {
      selectedUsecaseId = (selectedUsecaseId === id) ? null : id;
    } else if (type === "dsp") {
      selectedDspId = (selectedDspId === id) ? null : id;
    } else if (type === "ssp") {
      selectedSspId = (selectedSspId === id) ? null : id;
    } else if (type === "vermarkter") {
      selectedVermarkterId = (selectedVermarkterId === id) ? null : id;
    } else if (type === "publisher") {
      selectedPublisherId = (selectedPublisherId === id) ? null : id;
    }

    updateFiltering();
  }

  function removeFilter(type) {
    if (type === "usecase") selectedUsecaseId = null;
    else if (type === "dsp") selectedDspId = null;
    else if (type === "ssp") selectedSspId = null;
    else if (type === "vermarkter") selectedVermarkterId = null;
    else if (type === "publisher") selectedPublisherId = null;
    updateFiltering();
  }

  function resetFilters() {
    selectedUsecaseId = null;
    selectedDspId = null;
    selectedSspId = null;
    selectedVermarkterId = null;
    selectedPublisherId = null;
    updateFiltering();
    closeDrawer();
  }

  // --- Bidirectional Path-Based Filtering Logic ---

  function updateFiltering() {
    // 1. Get references to all DOM elements
    const usecaseCards = listUsecases.querySelectorAll(".partner-card");
    const dspCards = listDsps.querySelectorAll(".partner-card");
    const sspCards = listSsps.querySelectorAll(".partner-card");
    const vermarkterCards = listVermarkters.querySelectorAll(".partner-card");
    const publisherCards = listPublishers.querySelectorAll(".partner-card");
    const publisherGroupHeaders = listPublishers.querySelectorAll(".publisher-group-header");
    const sspGroupHeaders = listSsps.querySelectorAll(".ssp-group-header");

    // 2. Clear previous classes
    const allCards = [...usecaseCards, ...dspCards, ...sspCards, ...vermarkterCards, ...publisherCards];
    allCards.forEach(c => {
      c.className = "partner-card";
    });
    publisherGroupHeaders.forEach(h => {
      h.className = "publisher-group-header";
    });
    sspGroupHeaders.forEach(h => {
      h.className = "ssp-group-header";
    });

    // 3. Generate all physically connected paths in the ecosystem
    const allPaths = [];
    OVK_LANDSCAPE_CONFIG.usecases.forEach(u => {
      OVK_LANDSCAPE_CONFIG.dsps.forEach(d => {
        OVK_LANDSCAPE_CONFIG.ssps.forEach(s => {
          // Check DSP-SSP compatibility
          if (!d.supportedSSPs.includes(s.id)) return;
          
          OVK_LANDSCAPE_CONFIG.vermarkter.forEach(v => {
            // DSP and SSP both support Vermarkter
            if (!d.supportedVermarkter.includes(v.id)) return;
            if (!s.supportedVermarkter.includes(v.id)) return;
            
            OVK_LANDSCAPE_CONFIG.publishers.forEach(p => {
              // Publisher belongs to Vermarkter
              if (p.vermarkterId !== v.id) return;
              
              allPaths.push({
                usecase: u.id,
                dsp: d.id,
                ssp: s.id,
                vermarkter: v.id,
                publisher: p.id
              });
            });
          });
        });
      });
    });

    // Helper function to check if a path is usecase-compatible under the active filters:
    function isPathUsecaseCompatible(path, uId, dId, sId) {
      const uIdToCheck = uId || path.usecase;
      const d = OVK_LANDSCAPE_CONFIG.dsps.find(item => item.id === path.dsp);
      const s = OVK_LANDSCAPE_CONFIG.ssps.find(item => item.id === path.ssp);
      
      const selectedSsp = sId ? OVK_LANDSCAPE_CONFIG.ssps.find(item => item.id === sId) : null;
      const selectedDsp = dId ? OVK_LANDSCAPE_CONFIG.dsps.find(item => item.id === dId) : null;
      
      if (selectedSsp && selectedSsp.category === "curation" && (selectedSsp.supportedUsecases || []).includes(uIdToCheck)) {
        // A Curation SSP supporting this usecase is selected:
        // This SSP steers the usecase, so any DSP connected to this SSP is valid.
        if (s.id === selectedSspId) {
          return true;
        } else {
          return (d.supportedUsecases || []).includes(uIdToCheck);
        }
      } else {
        // No curation SSP is selected (or it doesn't support the usecase):
        // The usecase MUST be steered at the DSP level.
        if (selectedDsp) {
          return (selectedDsp.supportedUsecases || []).includes(uIdToCheck);
        } else {
          // If no DSP is selected, but a usecase filter is active:
          if (uId) {
            return (d.supportedUsecases || []).includes(uIdToCheck);
          } else {
            // If neither Usecase nor DSP nor Curation SSP is selected:
            // The path is compatible if either the DSP supports it OR the SSP is Curation supporting it
            return (d.supportedUsecases || []).includes(uIdToCheck) || 
                   (s.category === "curation" && (s.supportedUsecases || []).includes(uIdToCheck));
          }
        }
      }
    }

    // 4. Filter paths based on active selections (physical check first)
    const physicalMatchingPaths = allPaths.filter(path => {
      if (selectedUsecaseId && path.usecase !== selectedUsecaseId) return false;
      if (selectedDspId && path.dsp !== selectedDspId) return false;
      if (selectedSspId && path.ssp !== selectedSspId) return false;
      if (selectedVermarkterId && path.vermarkter !== selectedVermarkterId) return false;
      if (selectedPublisherId && path.publisher !== selectedPublisherId) return false;
      return true;
    });

    // 5. Gather all active IDs across stages in matching paths
    const activeUsecaseIds = new Set();
    const activeDspIds = new Set();
    const activeSspIds = new Set();
    const activeVermarkterIds = new Set();
    const activePublisherIds = new Set();

    physicalMatchingPaths.forEach(path => {
      // 1. For the Usecase column:
      // A usecase is active if there is any path for it that is compatible under the other filters
      if (isPathUsecaseCompatible(path, path.usecase, selectedDspId, selectedSspId)) {
        activeUsecaseIds.add(path.usecase);
      }
      
      // 2. For the other columns (DSP, SSP, Vermarkter, Publisher):
      // If a usecase filter is active, we only consider usecase-compatible paths.
      // If no usecase filter is active, any physically connected path is valid!
      if (selectedUsecaseId) {
        if (isPathUsecaseCompatible(path, selectedUsecaseId, selectedDspId, selectedSspId)) {
          activeDspIds.add(path.dsp);
          activeSspIds.add(path.ssp);
          activeVermarkterIds.add(path.vermarkter);
          activePublisherIds.add(path.publisher);
        }
      } else {
        // No usecase filter active -> all physical connections are active!
        activeDspIds.add(path.dsp);
        activeSspIds.add(path.ssp);
        activeVermarkterIds.add(path.vermarkter);
        activePublisherIds.add(path.publisher);
      }
    });

    const isAnyFilterActive = !!(
      selectedUsecaseId || selectedDspId || selectedSspId || selectedVermarkterId || selectedPublisherId
    );

    // Helper to assign CSS classes
    function applyClasses(cardsList, activeSet, selectedId) {
      cardsList.forEach(c => {
        const id = c.getAttribute("data-id");
        if (id === selectedId) {
          c.classList.add("selected");
        } else if (activeSet.has(id)) {
          if (isAnyFilterActive) {
            c.classList.add("highlighted");
          }
        } else {
          c.classList.add("inactive");
        }
      });
    }

    // Apply classes to each column
    applyClasses(usecaseCards, activeUsecaseIds, selectedUsecaseId);
    applyClasses(dspCards, activeDspIds, selectedDspId);
    applyClasses(sspCards, activeSspIds, selectedSspId);
    applyClasses(vermarkterCards, activeVermarkterIds, selectedVermarkterId);
    applyClasses(publisherCards, activePublisherIds, selectedPublisherId);

    // Apply class to publisher headers
    publisherGroupHeaders.forEach(h => {
      const vId = h.getAttribute("data-group-vermarkter");
      if (!activeVermarkterIds.has(vId)) {
        h.classList.add("inactive");
      }
    });

    // Apply class to SSP headers
    sspGroupHeaders.forEach(h => {
      const catId = h.getAttribute("data-group-category");
      const hasActiveSspInCat = OVK_LANDSCAPE_CONFIG.ssps
        .filter(s => s.category === catId)
        .some(s => activeSspIds.has(s.id));
      if (!hasActiveSspInCat) {
        h.classList.add("inactive");
      }
    });

    // 6. Update Control Panel chips and reset button
    updateControlPanel();
  }

  function updateControlPanel() {
    activeChipsContainer.innerHTML = "";
    
    const activeFilters = [];
    if (selectedUsecaseId) activeFilters.push({ type: "usecase", id: selectedUsecaseId, name: "Usecase", findFn: id => OVK_LANDSCAPE_CONFIG.usecases.find(u => u.id === id) });
    if (selectedDspId) activeFilters.push({ type: "dsp", id: selectedDspId, name: "DSP", findFn: id => OVK_LANDSCAPE_CONFIG.dsps.find(d => d.id === id) });
    if (selectedSspId) activeFilters.push({ type: "ssp", id: selectedSspId, name: "SSP", findFn: id => OVK_LANDSCAPE_CONFIG.ssps.find(s => s.id === id) });
    if (selectedVermarkterId) activeFilters.push({ type: "vermarkter", id: selectedVermarkterId, name: "Vermarkter", findFn: id => OVK_LANDSCAPE_CONFIG.vermarkter.find(v => v.id === id) });
    if (selectedPublisherId) activeFilters.push({ type: "publisher", id: selectedPublisherId, name: "Publisher", findFn: id => OVK_LANDSCAPE_CONFIG.publishers.find(p => p.id === id) });

    if (activeFilters.length === 0) {
      activeChipsContainer.innerHTML = `<span class="no-filter-text">Keine Filter aktiv</span>`;
      btnReset.disabled = true;
      return;
    }

    btnReset.disabled = false;

    activeFilters.forEach(f => {
      const item = f.findFn(f.id);
      if (item) {
        const chip = document.createElement("span");
        chip.className = `filter-chip chip-${f.type}`;
        if (f.type !== "usecase") {
          chip.style.borderLeft = "3px solid var(--color-ovk-blue)";
        }
        chip.innerHTML = `
          ${f.name}: ${item.name}
          <button class="btn-remove-filter" title="Filter entfernen">&times;</button>
        `;
        chip.querySelector(".btn-remove-filter").addEventListener("click", () => removeFilter(f.type));
        activeChipsContainer.appendChild(chip);
      }
    });
  }

  // --- Detail Drawer Logic ---

  function showDetails(id, type) {
    let title = "";
    let htmlContent = "";

    if (type === "usecase") {
      const item = OVK_LANDSCAPE_CONFIG.usecases.find(u => u.id === id);
      title = `Usecase: ${item.name}`;
      htmlContent = `
        <p><strong>Beschreibung:</strong> ${item.description}</p>
        <p style="margin-top: 0.5rem;"><em>Klicken Sie auf den Usecase, um die Ansicht auf diesen Filter einzuschränken.</em></p>
      `;
    } else if (type === "dsp") {
      const item = OVK_LANDSCAPE_CONFIG.dsps.find(d => d.id === id);
      title = `DSP: ${item.name}`;
      
      const ucNames = (item.supportedUsecases || []).map(uid => {
        const uc = OVK_LANDSCAPE_CONFIG.usecases.find(u => u.id === uid);
        return uc ? uc.name : uid;
      }).join(", ");
      
      const sspNames = item.supportedSSPs.map(sid => {
        const ssp = OVK_LANDSCAPE_CONFIG.ssps.find(s => s.id === sid);
        return ssp ? ssp.name : sid;
      }).join(", ");

      const vNames = item.supportedVermarkter.map(vid => {
        const v = OVK_LANDSCAPE_CONFIG.vermarkter.find(ver => ver.id === vid);
        return v ? v.name : vid;
      }).join(", ");

      htmlContent = `
        <p><strong>Unterstützte Usecases:</strong> ${ucNames}</p>
        <p><strong>Kompatible SSPs:</strong> ${sspNames}</p>
        <p><strong>Kompatible Vermarkter:</strong> ${vNames}</p>
        <p style="margin-top: 0.5rem;"><em>Klicken Sie auf die DSP, um die Ansicht auf diesen Filter einzuschränken.</em></p>
      `;
    } else if (type === "ssp") {
      const item = OVK_LANDSCAPE_CONFIG.ssps.find(s => s.id === id);
      title = `SSP: ${item.name}`;

      const vNames = item.supportedVermarkter.map(vid => {
        const v = OVK_LANDSCAPE_CONFIG.vermarkter.find(ver => ver.id === vid);
        return v ? v.name : vid;
      }).join(", ");

      const catLabel = item.category === "curation" 
        ? "Curation SSP (FC & Data Targeting möglich)" 
        : "Standard SSP (ID wird nur durchgereicht)";

      htmlContent = `<p><strong>Kategorie:</strong> ${catLabel}</p>`;
      
      // Only show usecases in details if curation
      if (item.category === "curation") {
        const ucNames = (item.supportedUsecases || []).map(uid => {
          const uc = OVK_LANDSCAPE_CONFIG.usecases.find(u => u.id === uid);
          return uc ? uc.name : uid;
        }).join(", ");
        htmlContent += `<p><strong>Unterstützte Usecases:</strong> ${ucNames}</p>`;
      }
      
      htmlContent += `
        <p><strong>Angebundene Vermarkter:</strong> ${vNames}</p>
        <p style="margin-top: 0.5rem;"><em>Klicken Sie auf die SSP, um die Ansicht auf diesen Filter einzuschränken.</em></p>
      `;
    } else if (type === "vermarkter") {
      const item = OVK_LANDSCAPE_CONFIG.vermarkter.find(v => v.id === id);
      title = `Vermarkter: ${item.name}`;
      
      const vPublishers = OVK_LANDSCAPE_CONFIG.publishers.filter(p => p.vermarkterId === id).map(p => p.name).join(", ");

      htmlContent = `
        <p><strong>Beschreibung:</strong> ${item.description}</p>
        <p><strong>Zugeordnete Publisher:</strong> ${vPublishers}</p>
        <p style="margin-top: 0.5rem;"><em>Klicken Sie auf den Vermarkter, um die Ansicht auf diesen Filter einzuschränken.</em></p>
      `;
    } else if (type === "publisher") {
      const item = OVK_LANDSCAPE_CONFIG.publishers.find(p => p.id === id);
      const parentV = OVK_LANDSCAPE_CONFIG.vermarkter.find(v => v.id === item.vermarkterId);
      title = `Publisher: ${item.name}`;
      htmlContent = `
        <p><strong>Vermarkter-Zuordnung:</strong> ${parentV ? parentV.name : item.vermarkterId}</p>
        <p style="margin-top: 0.5rem;"><em>Klicken Sie auf den Publisher, um die Ansicht auf diesen Filter einzuschränken.</em></p>
      `;
    }

    drawerTitle.textContent = title;
    drawerContent.innerHTML = htmlContent;
    detailDrawer.classList.add("open");
  }

  function closeDrawer() {
    detailDrawer.classList.remove("open");
  }
});
