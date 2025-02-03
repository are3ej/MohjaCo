import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getEquipment = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/equipment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    throw error;
  }
};