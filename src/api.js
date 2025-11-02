/* eslint-disable no-undef */
export const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth headers
const getAuthHeaders = (includeAuth = true) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Admin Login
export const adminLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/admin-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

// Teacher Login
export const teacherLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/teacher-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

// Submit Form
export const submitForm = async (formData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/submit-form`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Form submission failed');
  return response.json();
};

// Fetch Teachers
export const fetchTeachers = async () => {
  const response = await fetch(`${API_URL}/teachers`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch teachers');
  return response.json();
};

// Fetch Forms
export const fetchForms = async () => {
  const response = await fetch(`${API_URL}/forms`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch forms');
  return response.json();
};

// Fetch Admins
export const fetchAdmins = async () => {
  const response = await fetch(`${API_URL}/admins`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch admins');
  return response.json();
};

// Add Teacher
export const addTeacher = async (teacherData) => {
  const response = await fetch(`${API_URL}/add-teacher`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(teacherData),
  });
  if (!response.ok) throw new Error('Failed to add teacher');
  return response.json();
};

// Add Admin
export const addAdmin = async (adminData) => {
  const response = await fetch(`${API_URL}/add-admin`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(adminData),
  });
  if (!response.ok) throw new Error('Failed to add admin');
  return response.json();
};

// Delete Teacher
export const deleteTeacher = async (teacherId) => {
  const response = await fetch(`${API_URL}/delete-teacher/${teacherId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete teacher');
  return response;
};

// Delete Admin
export const deleteAdmin = async (adminId) => {
  const response = await fetch(`${API_URL}/delete-admin/${adminId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete admin');
  return response;
};

// Delete Form
export const deleteForm = async (formId) => {
  const response = await fetch(`${API_URL}/delete-form/${formId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete form');
  return response;
};

// Download Reports
export const downloadReport = (dateRange) => {
  window.open(`${API_URL}/download/${dateRange}`, '_blank');
};

