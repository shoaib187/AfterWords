import axios from 'axios';
import { baseUrl } from '../../common/base/api';

// POST /api/user/legacies/create
export const createLegacyGift = async (payload, token) => {
  console.log('object', payload);
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/legacies/create`,
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
      'Create Legacy Gift Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// GET /api/user/legacies/list
export const listLegacyGifts = async (token, params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `${baseUrl}/api/user/legacies/list?${queryParams}`
      : `${baseUrl}/api/user/legacies/list`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(
      'List Legacy Gifts Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// GET /api/user/legacies/get/[id]
export const getLegacyGift = async (id, token) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/legacies/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(
      'Get Legacy Gift Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// PUT /api/user/legacies/update/[id]
export const updateLegacyGift = async (id, payload, token) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/user/legacies/update/${id}`,
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
      'Update Legacy Gift Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// DELETE /api/user/legacies/delete/[id]
export const deleteLegacyGift = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/user/legacies/delete/${id}`,
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
      'Delete Legacy Gift Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
