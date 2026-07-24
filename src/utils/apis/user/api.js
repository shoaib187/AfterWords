import axios from 'axios';
import { baseUrl } from '../../common/base/api';

// GET /api/user/auth/me
export const getMe = async token => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log('Get Me Error:', error.response?.data || error.message);
    throw error;
  }
};

// ==================== SECURITY APIs ====================

// PUT /api/user/security/update
export const updateBiometricPreference = async (payload, token) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/user/security/update`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    console.log(
      'Update Biometric Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ==================== ONBOARDING APIs ====================

// GET /api/user/onboarding/status
export const getEstateReadinessStatus = async token => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/onboarding/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(
      'Get Estate Readiness Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// POST /api/user/onboarding/complete
export const completeOnboarding = async token => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/onboarding/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    console.log(
      'Complete Onboarding Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ==================== DASHBOARD APIs ====================

// GET /api/user/dashboard/stats
export const getDashboardStats = async token => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(
      'Get Dashboard Stats Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
