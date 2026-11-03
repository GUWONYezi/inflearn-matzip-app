import axios from 'axios';
import {Platform} from 'react-native';

export const baseUrl = {
  android: 'http://10.0.2.2:3030',
  ios: 'http://localhost:3030',
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrl.android : baseUrl.ios,
});

export default axiosInstance;
