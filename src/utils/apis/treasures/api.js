// ==================== TREASURES APIs ====================

import axios from 'axios';
import { baseUrl } from '../../common/base/api';

// POST /api/user/treasures/create

// POST /api/user/treasures/create
export const createTreasure = async (formData, token) => {
  if (__DEV__) {
    console.log('FormData being sent:');
    const parts = formData?._parts || [];
    parts.forEach(([key, value]) => {
      if (value && typeof value === 'object' && value.uri) {
        console.log(`${key}: ${value.name} (${value.type}) - ${value.uri}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    });
  }

  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/treasures/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set 'Content-Type': 'multipart/form-data' manually —
          // let axios/RN set it with the correct boundary automatically.
        },
        timeout: 120000, // 2 minutes
      },
    );
    return data;
  } catch (error) {
    console.log(
      'Create Treasure Error:',
      error.response?.data || error.message,
    );
    console.log('Error config:', error.config);
    throw error;
  }
};

// GET /api/user/treasures/list
export const listTreasures = async (token, params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `${baseUrl}/api/user/treasures/list?${queryParams}`
      : `${baseUrl}/api/user/treasures/list`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log('List Treasures Error:', error.response?.data || error.message);
    throw error;
  }
};

// GET /api/user/treasures/get/[id]
export const getTreasure = async (id, token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/user/treasures/get/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    console.log('Get Treasure Error:', error.response?.data || error.message);
    throw error;
  }
};

// PUT /api/user/treasures/update/[id]
export const updateTreasure = async (id, payload, token) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/user/treasures/update/${id}`,
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
      'Update Treasure Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// DELETE /api/user/treasures/delete/[id]
export const deleteTreasure = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/user/treasures/delete/${id}`,
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
      'Delete Treasure Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
