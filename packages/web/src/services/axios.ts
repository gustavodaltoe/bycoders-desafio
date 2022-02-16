import libAxios from 'axios';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3333';

export const axios = libAxios.create({
  baseURL,
});
