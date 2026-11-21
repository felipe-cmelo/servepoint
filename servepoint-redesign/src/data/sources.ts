/** Official sources cited on the site. Each URL was fetched on 2026-11-20 and returned 200. Cite the page title, never paraphrase rule text. */
export interface Source { label: string; url: string }

export const sources = {
  civilRules: { label: "Supreme Court Civil Rules, B.C. Reg. 168/2009 (BC Laws)", url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/168_2009_00" },
  civilForms: { label: "Supreme Court Civil Rules, Appendix A, List of Forms (BC Laws)", url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/168_2009_04" },
  form15: { label: "Form 15, Affidavit of Personal Service (B.C. Reg. 165/2024, BC Gazette)", url: "https://free.bcpublications.ca/civix/document/id/lc/bcgaz2/165_2024_Form15" },
  bcscServing: { label: "Supreme Court of British Columbia: Serving documents (civil)", url: "https://supremecourtbc.ca/civil-law/getting-started/serving-documents" },
  bcscFamilyServing: { label: "Supreme Court of British Columbia: Serving documents (family)", url: "https://supremecourtbc.ca/family-law/getting-started/starting-family-claim/serving-documents" },
  legalAidPersonal: { label: "Legal Aid BC, Family Law in BC: Serve Supreme Court documents by personal service", url: "https://family.legalaid.bc.ca/bc-legal-system/legal-forms-documents/serving-documents/serve-supreme-court-documents/personal" },
  courthouseLibrary: { label: "Courthouse Libraries BC: Service of Parties", url: "https://www.courthouselibrary.ca/node/1932" },
  courthouses: { label: "BC Government: courthouse locations", url: "https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-locations" },
  bcscLocations: { label: "Supreme Court of British Columbia: court locations", url: "https://supremecourtbc.ca/court-locations" },
  provincialLocations: { label: "Provincial Court of British Columbia: court locations", url: "https://provincialcourt.bc.ca/court-locations" },
  courtRegistry: { label: "BC Government: court registry services", url: "https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-roles/court-registry-services" },
  bcRegistry: { label: "BC Registries and Online Services", url: "https://www.bcregistry.gov.bc.ca/" },
} satisfies Record<string, Source>;
