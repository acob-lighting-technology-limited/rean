/**
 * Form options shared by the client form and the server schema. Kept free of zod so the
 * validation library never ships to the browser.
 */
export const INTENTS = ["pledge", "question"] as const;
export const MEMBERSHIP = ["corporate", "individual", "not-member"] as const;

export const intentLabel: Record<(typeof INTENTS)[number], string> = { pledge: "Pledge of support", question: "Question for Alexander" };
export const membershipLabel: Record<(typeof MEMBERSHIP)[number], string> = {
  corporate: "Representative of a member company",
  individual: "Individual member",
  "not-member": "Not a REAN member",
};
