// Skript zur Validierung der OVK ID Landscape Map Konfigurationsdaten
const fs = require('fs');
const path = require('path');

// Globales Fenster-Objekt mocken
global.window = {};

console.log('🔍 Starte Validierung der Konfigurationsdateien...');

let hasErrors = false;

function logError(message) {
  console.error(`❌ Fehler: ${message}`);
  hasErrors = true;
}

try {
  // 1. Dateien laden
  const corePath = path.join(__dirname, '../config/core.js');
  if (!fs.existsSync(corePath)) {
    logError('config/core.js existiert nicht!');
    process.exit(1);
  }
  const coreCode = fs.readFileSync(corePath, 'utf8');
  eval(coreCode);

  const vermarkterDir = path.join(__dirname, '../config/vermarkter');
  if (!fs.existsSync(vermarkterDir)) {
    logError('Verzeichnis config/vermarkter/ existiert nicht!');
    process.exit(1);
  }

  const vermarkterFiles = fs.readdirSync(vermarkterDir).filter(f => f.endsWith('.js'));
  if (vermarkterFiles.length === 0) {
    logError('Keine Vermarkter-Konfigurationsdateien in config/vermarkter/ gefunden!');
  }

  vermarkterFiles.forEach(file => {
    try {
      const code = fs.readFileSync(path.join(vermarkterDir, file), 'utf8');
      eval(code);
    } catch (e) {
      logError(`Fehler beim Evaluieren von config/vermarkter/${file}: ${e.message}`);
    }
  });

  const config = window.OVK_LANDSCAPE_CONFIG;
  if (!config) {
    logError('window.OVK_LANDSCAPE_CONFIG wurde nicht korrekt initialisiert.');
    process.exit(1);
  }

  // Helper zum Prüfen auf Duplikate
  const dspIds = new Set();
  const sspIds = new Set();
  const vermarkterIds = new Set();
  const publisherIds = new Set();
  const registeredIds = new Set();

  // 2. ID-Register validieren
  if (!Array.isArray(config.ids)) {
    logError('config.ids muss ein Array sein.');
  } else {
    config.ids.forEach((idObj, idx) => {
      if (!idObj.id) logError(`ID an Index ${idx} fehlt das Feld 'id'.`);
      else {
        const normalizedId = idObj.id.toLowerCase();
        if (registeredIds.has(normalizedId)) logError(`ID-Register enthält Duplikat: '${idObj.id}'`);
        registeredIds.add(normalizedId);
      }
      if (!idObj.name) logError(`ID '${idObj.id || idx}' fehlt das Feld 'name'.`);
      if (!idObj.shortName) logError(`ID '${idObj.id || idx}' fehlt das Feld 'shortName'.`);
      if (!idObj.color) logError(`ID '${idObj.id || idx}' fehlt das Feld 'color'.`);
    });
  }

  // 3. Usecases validieren
  if (!Array.isArray(config.usecases)) {
    logError('config.usecases muss ein Array sein.');
  } else {
    config.usecases.forEach((uc, idx) => {
      if (!uc.id) logError(`Usecase an Index ${idx} fehlt 'id'.`);
      if (!uc.name) logError(`Usecase '${uc.id || idx}' fehlt 'name'.`);
    });
  }

  // 4. DSPs validieren
  if (!Array.isArray(config.dsps)) {
    logError('config.dsps muss ein Array sein.');
  } else {
    config.dsps.forEach((dsp, idx) => {
      const dspName = dsp.name || `DSP Index ${idx}`;
      if (!dsp.id) logError(`DSP an Index ${idx} fehlt 'id'.`);
      else {
        if (dspIds.has(dsp.id)) logError(`DSP ID-Duplikat: '${dsp.id}'`);
        dspIds.add(dsp.id);
      }
      if (!dsp.name) logError(`DSP '${dsp.id || idx}' fehlt 'name'.`);
      if (!dsp.logo) logError(`DSP '${dspName}' fehlt 'logo'.`);
      if (!Array.isArray(dsp.supportedUsecases)) logError(`DSP '${dspName}': supportedUsecases muss ein Array sein.`);
      if (!Array.isArray(dsp.supportedSSPs)) logError(`DSP '${dspName}': supportedSSPs muss ein Array sein.`);
      if (!Array.isArray(dsp.supportedVermarkter)) logError(`DSP '${dspName}': supportedVermarkter muss ein Array sein.`);
      
      if (Array.isArray(dsp.supportedIds)) {
        dsp.supportedIds.forEach(id => {
          if (!registeredIds.has(id.toLowerCase())) {
            logError(`DSP '${dspName}' verweist auf nicht registriertes ID-System: '${id}'`);
          }
        });
      } else {
        logError(`DSP '${dspName}': supportedIds muss ein Array sein.`);
      }
    });
  }

  // 5. SSPs validieren
  if (!Array.isArray(config.ssps)) {
    logError('config.ssps muss ein Array sein.');
  } else {
    config.ssps.forEach((ssp, idx) => {
      const sspName = ssp.name || `SSP Index ${idx}`;
      if (!ssp.id) logError(`SSP an Index ${idx} fehlt 'id'.`);
      else {
        if (sspIds.has(ssp.id)) logError(`SSP ID-Duplikat: '${ssp.id}'`);
        sspIds.add(ssp.id);
      }
      if (!ssp.name) logError(`SSP '${ssp.id || idx}' fehlt 'name'.`);
      if (!ssp.category) logError(`SSP '${sspName}' fehlt 'category'.`);
      if (!Array.isArray(ssp.supportedVermarkter)) logError(`SSP '${sspName}': supportedVermarkter muss ein Array sein.`);

      if (Array.isArray(ssp.supportedIds)) {
        ssp.supportedIds.forEach(id => {
          if (!registeredIds.has(id.toLowerCase())) {
            logError(`SSP '${sspName}' verweist auf nicht registriertes ID-System: '${id}'`);
          }
        });
      } else {
        logError(`SSP '${sspName}': supportedIds muss ein Array sein.`);
      }
    });
  }

  // 6. Vermarkter & nested Publisher validieren
  if (!Array.isArray(config.vermarkter)) {
    logError('config.vermarkter muss ein Array sein.');
  } else {
    config.vermarkter.forEach((v, idx) => {
      const vName = v.name || `Vermarkter Index ${idx}`;
      if (!v.id) logError(`Vermarkter an Index ${idx} fehlt 'id'.`);
      else {
        if (vermarkterIds.has(v.id)) logError(`Vermarkter ID-Duplikat: '${v.id}'`);
        vermarkterIds.add(v.id);
      }
      if (!v.name) logError(`Vermarkter '${v.id || idx}' fehlt 'name'.`);
      if (!v.description) logError(`Vermarkter '${vName}' fehlt 'description'.`);

      if (!Array.isArray(v.publishers)) {
        logError(`Vermarkter '${vName}' besitzt kein gültiges 'publishers'-Array.`);
      } else {
        v.publishers.forEach((p, pIdx) => {
          const pName = p.name || `Publisher Index ${pIdx}`;
          if (!p.id) logError(`Publisher an Index ${pIdx} unter Vermarkter '${vName}' fehlt 'id'.`);
          else {
            if (publisherIds.has(p.id)) logError(`Publisher ID-Duplikat: '${p.id}' (muss global eindeutig sein)`);
            publisherIds.add(p.id);
          }
          if (!p.name) logError(`Publisher '${p.id || pIdx}' unter Vermarkter '${vName}' fehlt 'name'.`);
          if (!Array.isArray(p.supportedInventoryTypes)) {
            logError(`Publisher '${pName}' unter Vermarkter '${vName}': supportedInventoryTypes muss ein Array sein.`);
          }
          
          if (Array.isArray(p.supportedIds)) {
            p.supportedIds.forEach(id => {
              if (!registeredIds.has(id.toLowerCase())) {
                logError(`Publisher '${pName}' unter Vermarkter '${vName}' verweist auf nicht registriertes ID-System: '${id}'`);
              }
            });
          } else {
            logError(`Publisher '${pName}' unter Vermarkter '${vName}': supportedIds muss ein Array sein.`);
          }
        });
      }
    });
  }

  // 7. Referenzen zwischen den Stages prüfen (DSPs -> SSPs & Vermarkter)
  if (Array.isArray(config.dsps)) {
    config.dsps.forEach(dsp => {
      if (Array.isArray(dsp.supportedSSPs)) {
        dsp.supportedSSPs.forEach(sspId => {
          if (!sspIds.has(sspId)) {
            logError(`DSP '${dsp.name}' verweist auf nicht existierende SSP-ID: '${sspId}'`);
          }
        });
      }
      if (Array.isArray(dsp.supportedVermarkter)) {
        dsp.supportedVermarkter.forEach(vId => {
          if (!vermarkterIds.has(vId)) {
            logError(`DSP '${dsp.name}' verweist auf nicht existierende Vermarkter-ID: '${vId}'`);
          }
        });
      }
    });
  }

  // 8. Referenzen zwischen SSPs & Vermarktern prüfen
  if (Array.isArray(config.ssps)) {
    config.ssps.forEach(ssp => {
      if (Array.isArray(ssp.supportedVermarkter)) {
        ssp.supportedVermarkter.forEach(vId => {
          if (!vermarkterIds.has(vId)) {
            logError(`SSP '${ssp.name}' verweist auf nicht existierende Vermarkter-ID: '${vId}'`);
          }
        });
      }
    });
  }

} catch (globalError) {
  logError(`Kritischer globaler Fehler während der Validierung: ${globalError.stack}`);
}

if (hasErrors) {
  console.log('\n❌ Validierung FEHLGESCHLAGEN. Bitte die obigen Fehler beheben.');
  process.exit(1);
} else {
  console.log('\n✅ Validierung ERFOLGREICH. Alle Konfigurationen sind syntaktisch und referenziell korrekt!');
  process.exit(0);
}
