import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView, Alert} from 'react-native';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Header from 'components/Header';
import {WHITE} from 'utils/color';
import Input from 'components/Input';
import {hp, wp} from 'utils/size';
import Button from 'components/Button';
import api from 'api';
import {getToken} from 'api/jwt';

interface IAnswerState {
  [key: number]: string;
}

const WriteAnswerCheckScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackType, 'WriteAnswerCheckScreen'>>();
  const [answers, setAnswers] = useState<IAnswerState>({});
  const [inputs, setInputs] = useState<React.ReactNode[]>([]);
  let inputElements: React.ReactNode[] = [];

  useEffect(() => {
    const {firstNumber, lastNumber} = route.params;

    let answerObj: IAnswerState = {};
    for (let index = firstNumber; index <= lastNumber; index++) {
      answerObj[index] = '';
    }

    setAnswers(answerObj);

    for (let index = firstNumber; index <= lastNumber; index++) {
      inputElements.push(
        <Input
          key={`input-${index}`}
          top={hp('2.4%')}
          value={answers[index]}
          placeholder={`${index}번`}
          keyboardType="decimal-pad"
          onChangeText={text => {
            setAnswers(prev => {
              let prevState = prev as IAnswerState;
              prevState[index] = text;
              return prevState;
            });
          }}
        />,
      );
    }

    setInputs(inputElements);
  }, [route.params]);

  const onPressButton = () => {
    const {firstNumber, lastNumber, workbookId} = route.params;

    navigation.navigate('CheckAnswerScreen', {
      firstNumber: firstNumber,
      lastNumber: lastNumber,
      workbookId: workbookId,
      answers: answers,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="답 입력" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollContainer}>{inputs}</ScrollView>
      <View style={styles.buttonWrap}>
        <Button label="등록" onPress={onPressButton} />
      </View>
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
  scrollContainer: {
    width: '100%',
    paddingHorizontal: wp('7.7%'),
    marginTop: hp('0.8%'),
    marginBottom: hp('13.4'),
  },
  buttonWrap: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: hp('13.4'),
    backgroundColor: WHITE,
  },
});

export default WriteAnswerCheckScreen;
