import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import {WHITE} from 'utils/color';
import {hp} from 'utils/size';
import {RootState} from 'store/reducers';
import api from 'api';

const HomeScreen: React.FC = () => {
  const [workbooks, setWorkbooks] = useState<IWorkBook[]>();
  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    SplashScreen.hide();
    getWorkBooks();
  }, []);

  const getWorkBooks = async () => {
    const token = await AsyncStorage.getItem('access-token');
    const response = await api.get('/workbooks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setWorkbooks(response.data);
    }

    console.log(workbooks);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${user?.name}님, 오늘도 \n열심히 공부하세요!`} />
      <SearchBar top={hp('4.3%')} placeholder="문제집의 이름을 입력해주세요." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});

export default HomeScreen;
