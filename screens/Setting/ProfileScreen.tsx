import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header';
import {WHITE} from 'utils/color';
import Button from 'components/Button';
import Input from 'components/Input';
import {MEDIUM} from 'utils/font';
import {hp, wp} from 'utils/size';
import {RootState} from 'store/reducers';
import {getToken} from 'api/jwt';
import api from 'api';
import {chagneUser} from 'store/reducers/user';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const onPressEdit = async () => {
    try {
      const token = await getToken();
      const response = await api.patch(
        `/users/${user?.username}`,
        {
          name: name,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        dispatch(chagneUser(response.data));
        Alert.alert('회원 정보가 정상적으로 변경되었습니다.', '', [
          {
            text: '확인',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="프로필" onPress={() => navigation.goBack()} />
      <Text style={styles.label}>이름</Text>
      <Input
        top={hp('2.5%')}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.label}>이메일</Text>
      <Input
        top={hp('2.5%')}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Button label="저장" style={styles.button} onPress={onPressEdit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: WHITE,
    position: 'relative',
  },
  label: {
    fontSize: 18,
    width: '100%',
    paddingLeft: wp('7.7%'),
    textAlign: 'left',
    fontFamily: MEDIUM,
    marginTop: hp('4.4%'),
  },
  button: {
    position: 'absolute',
    bottom: hp('6.6%'),
  },
});

export default ProfileScreen;
