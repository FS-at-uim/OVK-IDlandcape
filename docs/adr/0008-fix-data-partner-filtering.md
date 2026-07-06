# ADR 0008: Fix Data Partner Filtering logic for Usecases

- **Status**: Accepted
- **Kontext**: Wenn der Usecase "Targeting (Data Partner)" ausgewählt wurde, blieben die Data Partner unter der Stufe 1a inaktiv. Der Grund war, dass bei der Überprüfung der Kompatibilität eines physischen Pfades mit den unterstützten IDs (`supportedIds`) davon ausgegangen wurde, dass die IDs in der Konfiguration als reine Strings vorliegen (`id => allowedIds.includes(id)`). Da in den Vermarkter-Konfigurationen kürzlich die `supportedIds` in Objekte (`{id: "...", coverage: ...}`) umgewandelt wurden, schlug die `.includes()` Methode fehl.
- **Entscheidung**: Die `isPathDataPartnerCompatible` Methode in `app.js` wurde so angepasst, dass sie bei der Überprüfung der IDs in DSPs, SSPs und Vermarktern sowohl Strings als auch Objekte korrekt verarbeitet (`typeof idObj === 'string' ? idObj : idObj.id`).
- **Konsequenzen**: Data Partner werden nun korrekt aktiviert und gefiltert, wenn der "Targeting (Data Partner)" Usecase ausgewählt wird und die ID-Kompatibilität über die DSP, SSP und den Vermarkter hinweg erfolgreich validiert werden kann.
