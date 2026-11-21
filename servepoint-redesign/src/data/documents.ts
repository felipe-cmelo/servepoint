/** The six document categories (content/home.md, copied from the current process serving page). */
export interface DocCategory {
  key: string;
  name: string;
  documents: string;
  send: string;
  words: string[];
}

export const docCategories: DocCategory[] = [
  { key: "civil", name: "Civil litigation", documents: "Notices of Civil Claim, petitions, applications and orders.", send: "Documents to serve, service address, deadline, court file number.", words: ["civil", "claim", "petition", "application", "order"] },
  { key: "family", name: "Family", documents: "Notices of Family Claim, applications and protection orders.", send: "Documents to serve, service address, deadline, court file number.", words: ["family", "divorce", "protection"] },
  { key: "witness", name: "Witness documents", documents: "Subpoenas and summonses.", send: "The document, the person's address, the hearing or trial date.", words: ["witness", "subpoena", "summons"] },
  { key: "commercial", name: "Commercial and debt", documents: "Demand letters, lien notices and statutory demands.", send: "Documents to serve, service address, deadline.", words: ["commercial", "debt", "demand", "lien", "statutory"] },
  { key: "tenancy", name: "Residential tenancy", documents: "Notices to end tenancy and RTB documents.", send: "The notice, the unit address with unit number, the deadline.", words: ["tenancy", "tenant", "rtb", "eviction", "notice to end"] },
  { key: "corporate", name: "Corporate", documents: "Documents requiring service on companies, registered offices or directors.", send: "The documents, the company name or incorporation number. We can confirm the registered office first.", words: ["corporate", "company", "director", "registered office"] },
];
