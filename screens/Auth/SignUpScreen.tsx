import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header';
import Input from 'components/Input';
import Button from 'components/Button';
import {hp} from 'utils/size';
import api from 'api';
import {WHITE} from 'utils/color';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();

  const onSignUp = async () => {
    if (!username) {
      Alert.alert('이름을 확인해주세요.');
      return;
    }

    if (username.length < 5) {
      Alert.alert('아이디는 5자 이상이어야 합니다.');
      return;
    }
    if (!password) {
      Alert.alert('비밀번호를 확인해주세요.');
      return;
    }
    if (!email) {
      Alert.alert('이메일을 확인해주세요.');
      return;
    }
    if (!name) {
      Alert.alert('이름을 확인해주세요');
      return;
    }

    try {
      const response = await api.post('/users/register', {
        username: username,
        password: password,
        email: email,
        name: name,
      });

      if (response.status === 201) {
        Alert.alert(
          '회원가입이 완료되었습니다.',
          '회원가입이 정상적으로 되었습니다.',
          [
            {
              text: '확인',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()} title="회원가입" />
      <Input
        top={hp('4.3%')}
        bottom={hp('3.8%')}
        placeholder="이름"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        bottom={hp('3.8%')}
        placeholder="아이디"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        bottom={hp('3.8%')}
        placeholder="이메일"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Input
        bottom={hp('7.6%')}
        placeholder="비밀번호"
        value={password}
        onChangeText={text => setPassword(text)}
        returnKeyType="join"
        returnKeyLabel="확인"
        onSubmitEditing={onSignUp}
        secureTextEntry
      />
      <Button label="확인" onPress={onSignUp} />
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

export default SignUpScreen;
