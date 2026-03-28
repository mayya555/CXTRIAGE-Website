export const mockScans = [
  { id: '1', patient: 'John Smith', age: 58, gender: 'M', dob: '1966-03-12', mrn: 'MRN-001234', status: 'completed', time: '2 hrs ago', date: '2026-03-06', tech: 'Sarah Williams', finding: 'Pneumonia' },
  { id: '2', patient: 'Sarah Johnson', age: 45, gender: 'F', dob: '1981-07-22', mrn: 'MRN-001235', status: 'processing', time: '3 hrs ago', date: '2026-03-06', tech: 'Sarah Williams', finding: 'Pending AI Analysis' },
  { id: '3', patient: 'Mike Davis', age: 72, gender: 'M', dob: '1954-01-08', mrn: 'MRN-001236', status: 'completed', time: '5 hrs ago', date: '2026-03-05', tech: 'Sarah Williams', finding: 'Normal' },
  { id: '4', patient: 'Emma Wilson', age: 34, gender: 'F', dob: '1992-11-30', mrn: 'MRN-001237', status: 'pending', time: '6 hrs ago', date: '2026-03-05', tech: 'James Park', finding: 'Awaiting Upload' },
  { id: '5', patient: 'Robert Lee', age: 61, gender: 'M', dob: '1965-05-18', mrn: 'MRN-001238', status: 'completed', time: '8 hrs ago', date: '2026-03-05', tech: 'Sarah Williams', finding: 'Pleural Effusion' },
  { id: '6', patient: 'Linda Chen', age: 49, gender: 'F', dob: '1977-09-04', mrn: 'MRN-001239', status: 'failed', time: '1 day ago', date: '2026-03-05', tech: 'James Park', finding: 'Poor Quality - Retake' },
  { id: '7', patient: 'Thomas Anderson', age: 65, gender: 'M', dob: '1961-04-20', mrn: 'MRN-001240', status: 'completed', time: '1 day ago', date: '2026-03-04', tech: 'Sarah Williams', finding: 'Cardiomegaly' },
  { id: '8', patient: 'Amanda Foster', age: 29, gender: 'F', dob: '1997-08-14', mrn: 'MRN-001241', status: 'completed', time: '2 days ago', date: '2026-03-04', tech: 'James Park', finding: 'Normal' },
];

export const mockCases = [
  { id: '1', patient: 'Robert Wilson', age: 68, gender: 'M', mrn: 'MRN-002100', priority: 'Critical', confidence: 92, status: 'new', date: '2026-03-06', finding: 'Pneumonia + Pleural Effusion', aiStatus: 'Complete' },
  { id: '2', patient: 'Mary Johnson', age: 54, gender: 'F', mrn: 'MRN-002101', priority: 'High', confidence: 87, status: 'new', date: '2026-03-06', finding: 'Cardiomegaly', aiStatus: 'Complete' },
  { id: '3', patient: 'James Brown', age: 71, gender: 'M', mrn: 'MRN-002102', priority: 'Critical', confidence: 95, status: 'new', date: '2026-03-06', finding: 'Tension Pneumothorax', aiStatus: 'Complete' },
  { id: '4', patient: 'Patricia Davis', age: 42, gender: 'F', mrn: 'MRN-002103', priority: 'Medium', confidence: 74, status: 'in_review', date: '2026-03-05', finding: 'Minor Atelectasis', aiStatus: 'Complete' },
  { id: '5', patient: 'Charles Martinez', age: 55, gender: 'M', mrn: 'MRN-002104', priority: 'Low', confidence: 62, status: 'in_review', date: '2026-03-05', finding: 'Possible Infiltrate', aiStatus: 'Complete' },
  { id: '6', patient: 'Barbara Anderson', age: 66, gender: 'F', mrn: 'MRN-002105', priority: 'High', confidence: 89, status: 'completed', date: '2026-03-05', finding: 'Consolidation', aiStatus: 'Complete' },
  { id: '7', patient: 'William Thompson', age: 77, gender: 'M', mrn: 'MRN-002106', priority: 'Medium', confidence: 71, status: 'new', date: '2026-03-06', finding: 'Bilateral Infiltrates', aiStatus: 'Complete' },
  { id: '8', patient: 'Susan Garcia', age: 48, gender: 'F', mrn: 'MRN-002107', priority: 'Low', confidence: 58, status: 'completed', date: '2026-03-04', finding: 'Normal Study', aiStatus: 'Complete' },
];

export const mockFindings = [
  { name: 'Pneumonia (Right Lower Lobe)', severity: 'Critical', confidence: 92, region: 'Right Lower Lobe' },
  { name: 'Pleural Effusion', severity: 'High', confidence: 88, region: 'Left Hemithorax' },
  { name: 'Cardiomegaly', severity: 'Medium', confidence: 75, region: 'Cardiac Silhouette' },
  { name: 'No Pneumothorax Detected', severity: 'Normal', confidence: 96, region: 'Bilateral' },
  { name: 'No Acute Bony Fractures', severity: 'Normal', confidence: 98, region: 'Ribcage / Clavicles' },
];

export const mockPatientHistory = [
  { id: '1', patient: 'Robert Wilson', age: 68, mrn: 'MRN-002100', lastVisit: '2026-03-06', totalScans: 4, diagnosis: 'Pneumonia + Pleural Effusion', status: 'Active' },
  { id: '2', patient: 'Mary Johnson', age: 54, mrn: 'MRN-002101', lastVisit: '2026-03-06', totalScans: 2, diagnosis: 'Cardiomegaly', status: 'Active' },
  { id: '3', patient: 'James Brown', age: 71, mrn: 'MRN-002102', lastVisit: '2026-03-06', totalScans: 6, diagnosis: 'Tension Pneumothorax', status: 'Critical' },
  { id: '4', patient: 'Patricia Davis', age: 42, mrn: 'MRN-002103', lastVisit: '2026-03-05', totalScans: 1, diagnosis: 'Minor Atelectasis', status: 'Stable' },
  { id: '5', patient: 'John Smith', age: 58, mrn: 'MRN-001234', lastVisit: '2026-03-05', totalScans: 3, diagnosis: 'Resolved Pneumonia', status: 'Discharged' },
  { id: '6', patient: 'Barbara Anderson', age: 66, mrn: 'MRN-002105', lastVisit: '2026-03-05', totalScans: 5, diagnosis: 'Consolidation', status: 'Active' },
  { id: '7', patient: 'William Thompson', age: 77, mrn: 'MRN-002106', lastVisit: '2026-03-06', totalScans: 8, diagnosis: 'Bilateral Infiltrates', status: 'Active' },
];

export const mockNotifications = [
  { id: '1', type: 'critical', title: 'Critical Finding', patient: 'James Brown', finding: 'Tension Pneumothorax', confidence: 95, time: '2 min ago', read: false },
  { id: '2', type: 'critical', title: 'Critical Alert', patient: 'Robert Wilson', finding: 'Pneumonia + Pleural Effusion', confidence: 92, time: '18 min ago', read: false },
  { id: '3', type: 'info', title: 'AI Analysis Complete', patient: 'Mary Johnson', finding: 'Cardiomegaly detected', confidence: 87, time: '1 hr ago', read: true },
  { id: '4', type: 'success', title: 'Report Shared', patient: 'Barbara Anderson', finding: 'Report sent to referring MD', confidence: 0, time: '2 hrs ago', read: true },
];
