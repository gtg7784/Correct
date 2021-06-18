import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Header from 'components/Header';
import {WHITE} from 'utils/color';
import TextArea from 'components/TextArea';
import {hp} from 'utils/size';
import Button from 'components/Button';

const ReportScreen: React.FC = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState('');

  const onPressSubmit = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'SettingStack',
          },
        ],
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="오류 신고하기" onPress={() => navigation.goBack()} />
      <TextArea
        top={hp('3.2%')}
        placeholder="앱 사용중 겪었던 오류를 적어주세요."
        value={content}
        onChangeText={text => setContent(text)}
      />
      <Button style={styles.button} label="저장" onPress={onPressSubmit} />
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
  button: {
    position: 'absolute',
    bottom: hp('3.3%'),
  },
});

export default ReportScreen;
