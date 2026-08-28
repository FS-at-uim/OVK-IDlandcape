# ADR 0009: Entfernung der allgemeinen ID-Reichweitenanzeige im Tooltip

- **Status**: Accepted
- **Kontext**: Auf den Partner-Kacheln (z. B. Vermarkter) wurden auf den ID-Badges (wie Utiq) Tooltips mit der allgemeinen prozentualen ID-Reichweite im Format `~ X% Inventar mit ID verfügbar` angezeigt. Da die ID-Reichweiten inventarspezifisch gepflegt werden (z. B. separat für Desktop, Mobile, CTV), sollte die allgemeine Reichweitenangabe auf den ID-Badges entfernt werden, um Redundanzen und Missverständnisse zu vermeiden.
- **Entscheidung**: 
  1. In `app.js` wurde die Funktion `appendIdBadges` so angepasst, dass der Tooltip der ID-Badges lediglich den vollen Namen des ID-Systems (`idDef.name`) anzeigt.
  2. In `app.js` wurde die Funktion `getIdsDetailsHtml` angepasst, sodass unter "Unterstützte ID-Systeme" in der Detailansicht keine allgemeine prozentuale Abdeckungsanzeige (z. B. `25% Abdeckung`) mehr dargestellt wird.
- **Konsequenzen**: Sowohl auf den Badges als auch in der Detailansicht werden nur noch die ID-Systemnamen ohne aggregierte Prozentwerte dargestellt. Inventarspezifische Abdeckungen verbleiben präzise auf den jeweiligen Inventar-Icons (Desktop, Mobile, CTV, App).
