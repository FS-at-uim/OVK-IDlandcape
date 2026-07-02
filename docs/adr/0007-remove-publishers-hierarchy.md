# ADR 0007: Remove Publishers Hierarchy

- **Status**: Accepted
- **Kontext**: Die Übersicht in der Applikation wurde durch die Darstellung von einzelnen Publishern (z.B. rtl.de, ntv.de) unnötig überfrachtet. Der fachliche Fokus liegt primär auf der Integrationstiefe und Abdeckung durch Vermarkter.
- **Entscheidung**: Die Entität "Publisher" wird aus der Konfiguration und der UI vollständig entfernt. Die tiefste Ebene in der Darstellungskette bilden nun die Vermarkter. Die Attribute `supportedInventoryTypes` und `supportedIds`, die bisher an den Publishern gepflegt wurden, werden auf die Ebene des jeweiligen Vermarkters hochgezogen und aggregiert.
- **Konsequenzen**:
  - **Vorteile**: Deutlich aufgeräumtere UI, reduzierte Komplexität im Code (Entfall von Verknüpfungen und Filtern auf Publisher-Ebene), einfachere Konfiguration.
  - **Nachteile**: Detailverlust darüber, welcher spezifische Publisher unter einem Vermarkter exakt welche ID unterstützt (wobei dies oft ohnehin netzwerkweit homogen gesteuert wird).
