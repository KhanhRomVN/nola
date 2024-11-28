import axios from 'axios';

const getAccessToken = () => localStorage.getItem('access_token');

// Tạo instance axios với config mặc định
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn token vào header
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const _GET = async (api: string) => {
  const response = await axiosInstance.get(api);
  return response.data;
};

const _POST = async (api: string, body: any) => {
  const response = await axiosInstance.post(api, body);
  return response.data;
};

const _PUT = async (api: string, body: any) => {
  const response = await axiosInstance.put(api, body);
  return response.data;
};

const _DELETE = async (api: string) => {
  const response = await axiosInstance.delete(api);
  return response.data;
};

export { _GET, _POST, _PUT, _DELETE };