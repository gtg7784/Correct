import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  Alert,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Logo from 'assets/images/logo.svg';
import Input from 'components/Input';
import Button from 'components/Button';
import {hp, wp} from 'utils/size';
import {BLACK, TRANSPARENT, WHITE} from 'utils/color';
import {BOLD, MEDIUM} from 'utils/font';
import api from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {chagneUser} from 'store/reducers/user';

const SignInScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setUser();
  }, []);

  const onSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const onSignIn = async () => {
    try {
      const response = await api.post('/token', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('access-token', response.data.access);
        await AsyncStorage.setItem('refresh-token', response.data.refresh);

        setUser();
      }
    } catch (error) {
      console.log(error.response);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다.', [
        {text: '확인', onPress: () => {}},
      ]);
    }
  };

  const setUser = async () => {
    try {
      const token = await AsyncStorage.getItem('access-token');
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(chagneUser(response.data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'MainTab',
              },
            ],
          }),
        );
      }
    } catch (error) {
      console.log(error);
      SplashScreen.hide();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo style={styles.logo} />
      <Input
        bottom={hp('2.4%')}
        placeholder="아이디"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        bottom={hp('6.4%')}
        placeholder="비밀번호"
        value={password}
        onChangeText={text => setPassword(text)}
        returnKeyType="join"
        returnKeyLabel="로그인"
        onSubmitEditing={onSignIn}
        secureTextEntry
      />
      <Button label="로그인" onPress={onSignIn} />
      <View style={styles.textWrap}>
        <Text style={styles.findIdText}>계정이 없으신가요?</Text>
        <TouchableHighlight onPress={onSignUp} underlayColor={TRANSPARENT}>
          <Text style={styles.signInText}>회원가입</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  logo: {
    width: wp('23.1%'),
    height: hp('10.7%'),
    marginBottom: hp('7.9%'),
  },
  textWrap: {
    width: wp('84.6%'),
    paddingHorizontal: wp('2.3%'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: hp('3%'),
    paddingBottom: hp('10%'),
  },
  findIdText: {
    fontFamily: MEDIUM,
    color: BLACK,
    fontSize: 14,
    marginRight: wp('0.5%'),
  },
  signInText: {
    fontFamily: BOLD,
    color: BLACK,
    fontSize: 14,
  },
});

export default SignInScreen;
