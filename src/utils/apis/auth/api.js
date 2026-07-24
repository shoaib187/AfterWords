import axios from 'axios';
import { baseUrl } from '../../common/base/api';

// ==================== AUTH APIs ====================

// POST /api/user/auth/register
export const register = async payload => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/auth/register`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    console.log('Register Error:', error.response?.data || error.message);
    throw error;
  }
};

// POST /api/user/auth/login
export const login = async payload => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/auth/login`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    console.log('Login Error:', error.response?.data || error.message);
    throw error;
  }
};

// POST /api/user/auth/logout
export const logout = async () => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/user/auth/logout`);
    return data;
  } catch (error) {
    console.log('Logout Error:', error.response?.data || error.message);
    throw error;
  }
};
