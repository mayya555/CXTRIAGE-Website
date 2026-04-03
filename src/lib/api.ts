export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export async function registerDoctor(data: any) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to register doctor');
  }

  return response.json();
}


export async function loginDoctor(data: any) {
  const loginData = {
    hospital_email: data.email,
    password: data.password
  };
  const response = await fetch(`${API_BASE_URL}/doctor/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Doctor login failed');
  }

  return response.json();
}

export async function registerTechnician(data: any) {
  const response = await fetch(`${API_BASE_URL}/technician/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to register technician');
  }

  return response.json();
}


export async function loginTechnician(data: any) {
  const response = await fetch(`${API_BASE_URL}/technician/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Technician login failed');
  }

  return response.json();
}

export async function getDashboardSummary() {
  const response = await fetch(`${API_BASE_URL}/doctor/dashboard-summary`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch dashboard summary');
  return response.json();
}

export async function getRecentCases(doctorId: number) {
  if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
    throw new Error('Invalid Doctor ID. Please log in again.');
  }
  const response = await fetch(`${API_BASE_URL}/case-queue?doctor_id=${doctorId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch recent cases');
  return response.json();
}

export async function getPriorityCases(doctorId: number) {
  if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
    throw new Error('Invalid Doctor ID. Please log in again.');
  }
  const response = await fetch(`${API_BASE_URL}/critical-alerts?doctor_id=${doctorId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch priority cases');
  return response.json();
}

// Technician Endpoints
export async function getTechnicianDashboard(technicianId: number) {
  const response = await fetch(`${API_BASE_URL}/technician/dashboard/${technicianId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch technician dashboard');
  return response.json();
}

export async function registerPatient(data: any) {
  const response = await fetch(`${API_BASE_URL}/technician/register-patient`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to register patient');
  }
  return response.json();
}

export async function startScan(patientId: number, technicianId: number) {
  const response = await fetch(`${API_BASE_URL}/start-scan/${patientId}?technician_id=${technicianId}`, { method: 'POST' });
  if (!response.ok) throw new Error('Failed to start scan');
  return response.json();
}

export async function saveScanPreparation(scanId: number, data: any) {
  const response = await fetch(`${API_BASE_URL}/scan-preparation/${scanId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to save scan preparation');
  return response.json();
}

export async function uploadScan(scanId: number, file: File, doctorId: number, technicianUrgency: string = "Routine") {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/upload-scan/${scanId}?doctor_id=${doctorId}&technician_urgency=${encodeURIComponent(technicianUrgency)}`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload scan');
  return response.json();
}

export async function getScanHistory(technicianId: number, status?: string) {
  const url = status 
    ? `${API_BASE_URL}/scan-history?technician_id=${technicianId}&status=${status}` 
    : `${API_BASE_URL}/scan-history?technician_id=${technicianId}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch scan history');
  return response.json();
}

export async function getScanDetails(scanCode: string) {
  const response = await fetch(`${API_BASE_URL}/scan/${scanCode}`);
  if (!response.ok) throw new Error('Failed to fetch scan details');
  return response.json();
}

export async function getDoctorProfile(email: string) {
  const response = await fetch(`${API_BASE_URL}/doctor/profile/${email}`);
  if (!response.ok) throw new Error('Failed to fetch doctor profile');
  return response.json();
}

export async function getDoctorStats(doctorId: number) {
  const response = await fetch(`${API_BASE_URL}/doctor/stats/${doctorId}`);
  if (!response.ok) throw new Error('Failed to fetch doctor stats');
  return response.json();
}

export async function updateDoctorProfile(data: any) {
  const response = await fetch(`${API_BASE_URL}/doctor/update-profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
}

export async function uploadDoctorPhoto(email: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/doctor/upload-photo/${email}`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload photo');
  return response.json();
}

export async function updateLanguage(doctorId: number, language: string) {
  const response = await fetch(`${API_BASE_URL}/language/${doctorId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ preferred_language: language }),
  });
  if (!response.ok) throw new Error('Failed to update language');
  return response.json();
}

// Technician Profile
export async function getTechnicianProfile(technicianId: number) {
  const response = await fetch(`${API_BASE_URL}/technician/profile/${technicianId}`);
  if (!response.ok) throw new Error('Failed to fetch technician profile');
  return response.json();
}

export async function updateTechnicianProfile(technicianId: number, data: any) {
  const response = await fetch(`${API_BASE_URL}/technician/profile/${technicianId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update technician profile');
  return response.json();
}
// Case Management
export async function getCaseById(caseId: string) {
  const response = await fetch(`${API_BASE_URL}/case/${caseId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch case details');
  return response.json();
}

export async function updateCaseDiagnosis(caseId: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/case/${caseId}/diagnosis`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update diagnosis');
  return response.json();
}

export async function getPatientHistory(doctorId: number) {
  if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
    throw new Error('Invalid Doctor ID. Please log in again.');
  }
  const response = await fetch(`${API_BASE_URL}/case-history?doctor_id=${doctorId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch patient history');
  return response.json();
}

export async function finalizeReport(caseId: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/case/${caseId}/finalize-sign`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to finalize report');
  return response.json();
}

export async function downloadReportPDF(caseId: string) {
  const response = await fetch(`${API_BASE_URL}/case/${caseId}/download-pdf`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to download PDF');
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Report_${caseId}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export async function getPatientHistoryDetail(patientName: string, doctorId: number) {
  if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
    throw new Error('Invalid Doctor ID. Please log in again.');
  }
  const response = await fetch(`${API_BASE_URL}/medical-history/${encodeURIComponent(patientName)}?doctor_id=${doctorId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch patient history detail');
  return response.json();
}

export async function getDoctors() {
  const response = await fetch(`${API_BASE_URL}/doctors`);
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return response.json();
}

export async function createStudy(scanId: number, doctorId: number) {
  const response = await fetch(`${API_BASE_URL}/create-study/${scanId}?doctor_id=${doctorId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to create clinical study');
  return response.json();
}

export async function distributeStudy(studyId: number) {
  const response = await fetch(`${API_BASE_URL}/distribute-study/${studyId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to distribute study');
  return response.json();
}

export async function getNotifications(userId: number, role: string) {
  const response = await fetch(`${API_BASE_URL}/notifications/${userId}?role=${role}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
}
