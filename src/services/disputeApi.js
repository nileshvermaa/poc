// Dispute submission service.
//
// In the real system, the D2C backend receives this payload, creates ONE parent
// case in Salesforce with one child case per dispute item, and returns the IDs.
// Salesforce then hands the case to DRS, which routes it to the credit institution.
//
// By default this file uses an in-browser mock so the prototype runs standalone.
// Set VITE_USE_REAL_API=true and VITE_DISPUTE_API_BASE in .env to call a backend.

const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';
const API_BASE = import.meta.env.VITE_DISPUTE_API_BASE || '';

/**
 * @typedef {Object} DisputeItem
 * @property {string} id         client-side item id, e.g. "tl-T2", "pi", "enq-E4"
 * @property {'tl'|'pi'|'enq'} kind
 * @property {string} category   "Account details" | "Personal information" | "Enquiry details"
 * @property {string} title
 * @property {string} [scenario] tradeline scenario: incorrect | duplicate | unrecognized
 * @property {string} [ref]      tradeline / enquiry reference
 * @property {{field:string,label:string,from:string,to:string}[]} changes
 */

/**
 * Submit all dispute items as a single parent case.
 * @param {{ consumerId: string, items: DisputeItem[] }} payload
 * @returns {Promise<{ parentCaseId: string, children: { id: string, itemId: string }[] }>}
 */
export async function submitDispute(payload) {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE}/disputes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Dispute submission failed (${res.status})`);
    return res.json();
  }

  // Mock: simulate latency and Salesforce-style case IDs.
  await new Promise((r) => setTimeout(r, 600));
  const parentCaseId = `CS-2026-${Math.floor(100000 + Math.random() * 899999)}`;
  return {
    parentCaseId,
    children: payload.items.map((it, i) => ({ id: `${parentCaseId}-${String(i + 1).padStart(2, '0')}`, itemId: it.id })),
  };
}

/**
 * Fetch dispute status for the logged-in consumer (Dispute Status tab).
 * The mock returns null so the app keeps its local state.
 */
export async function fetchDisputeStatus() {
  if (!USE_REAL_API) return null;
  const res = await fetch(`${API_BASE}/disputes`, { credentials: 'include' });
  if (!res.ok) throw new Error(`Status fetch failed (${res.status})`);
  return res.json();
}
