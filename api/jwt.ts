import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'api';

interface IToken {
  access: string;
  refresh: string;
}

export const setToken = async ({access, refresh}: IToken) => {
  await AsyncStorage.setItem('access-token', access);
  await AsyncStorage.setItem('refresh-token', refresh);
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access-token');
    const response = await api.post('/token​/verify', {
      token,
    });

    if (response.status === 200) {
      return response.data.access;
    }
  } catch (error) {
    console.log(error.response);
    const refresh = await AsyncStorage.getItem('refresh-token');
    const response = await api.post('/token/refresh', {
      refresh,
    });

    if (response.status === 200) {
      const token = response.data.access;
      await AsyncStorage.setItem('access-token', token);
      return token;
    }
  }
};

export const clearToken = async () => {
  await AsyncStorage.clear();
};
