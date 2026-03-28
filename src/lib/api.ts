const API_BASE_URL = 'http://localhost:8000';

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
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
  const response = await fetch(`${API_BASE_URL}/doctor/dashboard-summary`);
  if (!response.ok) throw new Error('Failed to fetch dashboard summary');
  return response.json();
}

export async function getRecentCases() {
  const response = await fetch(`${API_BASE_URL}/case-queue`);
  if (!response.ok) throw new Error('Failed to fetch recent cases');
  return response.json();
}

export async function getPriorityCases() {
  const response = await fetch(`${API_BASE_URL}/critical-alerts`);
  if (!response.ok) throw new Error('Failed to fetch priority cases');
  return response.json();
}

// Technician Endpoints
export async function getTechnicianDashboard(technicianId: number) {
  const response = await fetch(`${API_BASE_URL}/technician/dashboard/${technicianId}`);
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

export async function startScan(patientId: number) {
  const response = await fetch(`${API_BASE_URL}/start-scan/${patientId}`, { method: 'POST' });
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

export async function uploadScan(scanId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/upload-scan/${scanId}`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload scan');
  return response.json();
}

export async function getScanHistory(status?: string) {
  const url = status ? `${API_BASE_URL}/scan-history?status=${status}` : `${API_BASE_URL}/scan-history`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch scan history');
  return response.json();
}

export async function getScanDetails(scanCode: string) {
  const response = await fetch(`${API_BASE_URL}/scan/${scanCode}`);
  if (!response.ok) throw new Error('Failed to fetch scan details');
  return response.json();
}

// Doctor Profile & Settings
export async function getDoctorProfile(email: string) {
  const response = await fetch(`${API_BASE_URL}/doctor/profile/${email}`);
  if (!response.ok) throw new Error('Failed to fetch doctor profile');
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
