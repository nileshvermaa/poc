// Sample data for the prototype. Replace with the D2C credit-report API response.
// All names, account numbers and amounts are fictional.

export const OPTIONS = {
  accountType: ['Personal Loan', 'Home Loan', 'Auto Loan', 'Credit Card', 'Gold Loan', 'Consumer Durable Loan', 'Business Loan', 'Education Loan'],
  ownership: ['Individual', 'Joint', 'Guarantor', 'Authorised User'],
  accountStatus: ['Current', 'Closed', 'Settled', 'Written-off', 'Restructured', 'Suit Filed', 'Wilful Default'],
  dpd: ['000', '001-030', '031-060', '061-090', '091-180', '180+'],
  assetClass: ['Standard', 'SMA-0', 'SMA-1', 'SMA-2', 'Sub-standard', 'Doubtful', 'Loss'],
  suitFiled: ['No Suit Filed', 'Suit Filed', 'Wilful Default', 'Suit Filed & Wilful Default'],
  tenure: ['', '12 months', '24 months', '36 months', '48 months', '60 months', '84 months', '120 months', '180 months', '240 months'],
  payFreq: ['Monthly', 'Quarterly', 'Half-yearly', 'Annual', 'Bullet'],
  collateralType: ['None', 'Residential Property', 'Commercial Property', 'Vehicle', 'Gold', 'Fixed Deposit', 'Shares / Securities'],
  gender: ['Male', 'Female', 'Transgender'],
  addrType: ['Residence', 'Permanent', 'Office', 'Other'],
  state: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
  phoneType: ['Mobile', 'Home', 'Office'],
};

export const CONSUMER = {
  name: 'Aarav Mehta',
  initials: 'AM',
  score: 742,
  reportDate: '01 Oct 2026',
  eligibleForFreeReport: true,
};

const BASE = {
  notMine: false, writeOff: '0', pastDue: '0', creditLimit: '', collateralValue: '',
  collateralType: 'None', dateClosed: '', suitFiled: 'No Suit Filed', payFreq: 'Monthly', hist: {},
};
const RECENT = ['Sep 2026', 'Aug 2026', 'Jul 2026', 'Jun 2026', 'May 2026', 'Apr 2026'];

// `hist` holds per-month overrides of the account-level status fields (index into `months`).
export const TRADELINES = [
  { ...BASE, id: 'T1', group: 'open', institution: 'Alpha Bank Ltd', accountNumber: 'XXXXXXXX4821', accountType: 'Personal Loan', ownershipType: 'Individual', accountStatus: 'Current', dpd: '000', assetClass: 'Standard', balance: '182400', lastPayAmt: '12850', sanctioned: '400000', emi: '12850', interestRate: '13.5', lastPayDate: '2026-09-05', dateReported: '2026-09-30', dateOpened: '2024-03-12', tenure: '36 months', months: RECENT },
  { ...BASE, id: 'T2', group: 'open', institution: 'Metro Card Services', accountNumber: 'XXXXXXXX9930', accountType: 'Credit Card', ownershipType: 'Individual', accountStatus: 'Current', dpd: '031-060', assetClass: 'SMA-1', balance: '64210', pastDue: '8200', lastPayAmt: '5000', sanctioned: '', creditLimit: '150000', emi: '', interestRate: '42', lastPayDate: '2026-08-18', dateReported: '2026-09-30', dateOpened: '2021-11-02', tenure: '', months: RECENT,
    hist: { 1: { dpd: '001-030', assetClass: 'SMA-0' }, 2: { dpd: '000', assetClass: 'Standard' }, 3: { dpd: '000', assetClass: 'Standard' }, 4: { dpd: '000', assetClass: 'Standard' }, 5: { dpd: '000', assetClass: 'Standard' } } },
  { ...BASE, id: 'T3', group: 'open', institution: 'Northstar Housing Finance', accountNumber: 'XXXXXXXX1177', accountType: 'Home Loan', ownershipType: 'Joint', accountStatus: 'Current', dpd: '000', assetClass: 'Standard', balance: '3245000', lastPayAmt: '34800', sanctioned: '4000000', emi: '34800', interestRate: '8.6', lastPayDate: '2026-09-07', dateReported: '2026-09-30', dateOpened: '2019-06-20', tenure: '240 months', collateralValue: '6500000', collateralType: 'Residential Property', months: RECENT },
  { ...BASE, id: 'T4', group: 'closed', institution: 'Vega Auto Finance', accountNumber: 'XXXXXXXX5502', accountType: 'Auto Loan', ownershipType: 'Individual', accountStatus: 'Closed', dpd: '000', assetClass: 'Standard', balance: '0', lastPayAmt: '15600', sanctioned: '650000', emi: '15600', interestRate: '9.4', lastPayDate: '2025-11-20', dateReported: '2025-11-30', dateOpened: '2022-01-10', dateClosed: '2025-11-20', tenure: '48 months', collateralValue: '780000', collateralType: 'Vehicle',
    months: ['Nov 2025', 'Oct 2025', 'Sep 2025', 'Aug 2025', 'Jul 2025', 'Jun 2025'],
    hist: { 1: { accountStatus: 'Current' }, 2: { accountStatus: 'Current' }, 3: { accountStatus: 'Current' }, 4: { accountStatus: 'Current' }, 5: { accountStatus: 'Current' } } },
  { ...BASE, id: 'T5', group: 'closed', institution: 'Quickcash Credit Pvt Ltd', accountNumber: 'XXXXXXXX0937', accountType: 'Consumer Durable Loan', ownershipType: 'Individual', accountStatus: 'Written-off', dpd: '180+', assetClass: 'Loss', balance: '0', writeOff: '23500', lastPayAmt: '2100', sanctioned: '36000', emi: '3100', interestRate: '24', lastPayDate: '2025-03-04', dateReported: '2026-01-31', dateOpened: '2024-11-15', dateClosed: '2026-01-31', tenure: '12 months',
    months: ['Jan 2026', 'Dec 2025', 'Nov 2025', 'Oct 2025', 'Sep 2025', 'Aug 2025'],
    hist: { 2: { accountStatus: 'Current', dpd: '091-180', assetClass: 'Doubtful' }, 3: { accountStatus: 'Current', dpd: '061-090', assetClass: 'SMA-2' }, 4: { accountStatus: 'Current', dpd: '031-060', assetClass: 'SMA-1' }, 5: { accountStatus: 'Current', dpd: '001-030', assetClass: 'SMA-0' } } },
];

// Field definitions for the tradeline dispute form: [key, label, type, optionsKey, format]
// type: ro | text | date | select | check   format: amt | pct
export const TRADELINE_FIELDS = [
  { title: 'Account identity', fields: [['accountNumber', 'Account Number', 'ro'], ['institution', 'Institution Name', 'ro'], ['accountType', 'Account Type', 'select', 'accountType'], ['ownershipType', 'Ownership Type', 'select', 'ownership'], ['notMine', 'Account does not belong to me', 'check']] },
  { title: 'Status & classification', fields: [['accountStatus', 'Account Status', 'select', 'accountStatus'], ['dpd', 'Days Past Due', 'select', 'dpd'], ['assetClass', 'Asset Classification', 'select', 'assetClass'], ['suitFiled', 'Suit Filed Status', 'select', 'suitFiled']] },
  { title: 'Amounts', fields: [['balance', 'Balance', 'text', null, 'amt'], ['pastDue', 'Past Due Amount', 'text', null, 'amt'], ['lastPayAmt', 'Last Payment Amount', 'text', null, 'amt'], ['writeOff', 'Write-off Amount', 'text', null, 'amt'], ['sanctioned', 'Sanctioned Amount', 'text', null, 'amt'], ['creditLimit', 'Credit Limit', 'text', null, 'amt'], ['emi', 'Monthly Payment Amount', 'text', null, 'amt'], ['interestRate', 'Interest Rate', 'text', null, 'pct']] },
  { title: 'Dates', fields: [['lastPayDate', 'Last Payment Date', 'date'], ['dateReported', 'Date Reported', 'date'], ['dateOpened', 'Date Opened', 'date'], ['dateClosed', 'Date Closed', 'date']] },
  { title: 'Terms & collateral', fields: [['tenure', 'Repayment Tenure', 'select', 'tenure'], ['payFreq', 'Payment Frequency', 'select', 'payFreq'], ['collateralValue', 'Collateral Value', 'text', null, 'amt'], ['collateralType', 'Collateral Type', 'select', 'collateralType']] },
];

// History table columns (per reported month)
export const HISTORY_COLUMNS = [
  { field: 'accountStatus', label: 'Account Status', optionsKey: 'accountStatus' },
  { field: 'assetClass', label: 'Asset Classification', optionsKey: 'assetClass' },
  { field: 'suitFiled', label: 'Suit Filed Status', optionsKey: 'suitFiled' },
  { field: 'dpd', label: 'Days Past Due', optionsKey: null }, // editable text per BRD
];

// Personal information: [key, label, type, optionsKey, reportedValue, format]
export const PERSONAL_SECTIONS = [
  { title: 'Basic details', fields: [['fullName', 'Full Name', 'text', null, 'Aarav Mehta'], ['dob', 'Date of Birth', 'date', null, '1990-06-14'], ['gender', 'Gender', 'select', 'gender', 'Male']] },
  { title: 'Identification · 1', fields: [['id0type', 'ID Type', 'ro', null, 'PAN'], ['id0', 'ID Value / Number', 'text', null, 'ABCPM1234K']] },
  { title: 'Identification · 2', fields: [['id1type', 'ID Type', 'ro', null, 'Voter ID'], ['id1', 'ID Value / Number', 'text', null, 'XYZ1234567']] },
  { title: 'Identification · 3', fields: [['id2type', 'ID Type', 'ro', null, 'Passport'], ['id2', 'ID Value / Number', 'text', null, 'N1234567']] },
  { title: 'Address · 1', fields: [['a0type', 'Address Type', 'select', 'addrType', 'Residence'], ['a0street', 'Street Address', 'text', null, 'Flat 302, Lakeview Residency, Powai, Mumbai'], ['a0state', 'State', 'select', 'state', 'Maharashtra'], ['a0pin', 'Postal Code', 'text', null, '400076'], ['a0rep', 'Date Reported', 'ro', null, '2026-08-31', 'date']] },
  { title: 'Address · 2', fields: [['a1type', 'Address Type', 'select', 'addrType', 'Permanent'], ['a1street', 'Street Address', 'text', null, '14, Lighthouse Hill Road, Mangaluru'], ['a1state', 'State', 'select', 'state', 'Karnataka'], ['a1pin', 'Postal Code', 'text', null, '575001'], ['a1rep', 'Date Reported', 'ro', null, '2024-02-29', 'date']] },
  { title: 'Contact details', fields: [['p0', 'Phone Number', 'text', null, '9876500001'], ['p0type', 'Phone Type', 'select', 'phoneType', 'Mobile'], ['p1', 'Phone Number (2)', 'text', null, '02240000001'], ['p1type', 'Phone Type (2)', 'select', 'phoneType', 'Home'], ['email', 'Email Address', 'text', null, 'aarav.mehta@example.com']] },
];

export const ENQUIRIES = [
  { id: 'E1', inst: 'Alpha Bank Ltd', date: '2024-03-08', time: '11:42', purpose: 'Personal Loan', amount: '400000' },
  { id: 'E2', inst: 'Metro Card Services', date: '2025-12-14', time: '16:05', purpose: 'Credit Card', amount: '150000' },
  { id: 'E3', inst: 'Brightline Finance', date: '2026-06-02', time: '09:18', purpose: 'Personal Loan', amount: '250000' },
  { id: 'E4', inst: 'Zenpay Lending', date: '2026-08-27', time: '21:47', purpose: 'Business Loan', amount: '500000' },
];

export const SCENARIOS = {
  incorrect: { label: 'Incorrect account information', sub: 'A balance, date, status or other detail is wrong', help: 'Choose the account, then correct any value that was reported incorrectly, including monthly history.' },
  duplicate: { label: 'Duplicate account', sub: 'The same account appears more than once', help: 'Choose the account that appears twice. Correct any values if needed; otherwise it is raised as a duplicate.' },
  unrecognized: { label: 'Account I did not open', sub: 'You never opened this account', help: 'Choose the account you did not open. "Account does not belong to me" is pre-selected.' },
};

export const CASE_STAGES = ['Received', 'Under review', 'With the lender', 'Resolved'];

export const SEED_CASES = [
  { id: 'CS-2026-418207', date: '14 Jul 2026', children: [
    { id: 'CS-2026-418207-01', category: 'Enquiry details', title: 'Unauthorised enquiry: Kestrel Capital (02 Jun 2026)', stage: 3 },
  ] },
];
