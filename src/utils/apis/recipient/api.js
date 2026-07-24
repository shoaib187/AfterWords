// ==================== RECIPIENTS APIs ====================

import axios from 'axios';
import { baseUrl } from '../../common/base/api';

// POST /api/user/recipients/create
export const createRecipient = async (payload, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/recipients/create`,
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
      'Create Recipient Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// GET /api/user/recipients/list
export const listRecipients = async (token, params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `${baseUrl}/api/user/recipients/list?${queryParams}`
      : `${baseUrl}/api/user/recipients/list`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(
      'List Recipients Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// GET /api/user/recipients/get/[id]
export const getRecipient = async (id, token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/user/recipients/get/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    console.log('Get Recipient Error:', error.response?.data || error.message);
    throw error;
  }
};

// PUT /api/user/recipients/update/[id]
export const updateRecipient = async (id, payload, token) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/user/recipients/update/${id}`,
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
      'Update Recipient Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// DELETE /api/user/recipients/delete/[id]
export const deleteRecipient = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/user/recipients/delete/${id}`,
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
      'Delete Recipient Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
