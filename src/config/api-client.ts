import axios from 'axios';
// import { store } from './store';


const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;