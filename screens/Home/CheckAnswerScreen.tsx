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
import OIcon from 'assets/images/o.svg';
import XIcon from 'assets/images/x.svg';

interface IAnswerState {
  answer: number;
  is_correct: boolean;
}

const CheckAnswerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackType, 'CheckAnswerScreen'>>();
  const [realAnswers, setRealAnswers] = useState<IAnswerState[]>([]);
  const [inputs, setInputs] = useState<React.ReactNode[]>([]);
  let inputElements: React.ReactNode[] = [];

  useEffect(() => {
    getAnswers();
  }, []);

  const getAnswers = async () => {
    const {answers, workbookId} = route.params;

    const token = await getToken();
    const response = await api.post(
      `/workbooks/${workbookId}/mark`,
      {
        answers: answers,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response.data);

    setRealAnswers(response.data);
    renderInputs();
  };

  const renderInputs = () => {
    const {firstNumber, lastNumber, answers} = route.params;

    for (let index = firstNumber; index <= lastNumber; index++) {
      inputElements.push(
        <View style={styles.inputWrap}>
          <Input
            key={`input-${index}`}
            value={`${index}번 - ${answers[index]}`}
            placeholder={`${index}번`}
            keyboardType="decimal-pad"
            onChangeText={text => {
              return answers[index] as string;
            }}
          />
          {realAnswers[index].is_correct ? (
            <OIcon style={styles.icon} />
          ) : (
            <XIcon style={styles.icon} />
          )}
        </View>,
      );
    }

    setInputs(inputElements);
  };

  const onPressButton = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
          },
        ],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="채점 결과" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollContainer}>{inputs}</ScrollView>
      <View style={styles.buttonWrap}>
        <Button label="완료" onPress={onPressButton} />
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
  inputWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('6.2%'),
    marginTop: hp('2.4%'),
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
  icon: {
    marginLeft: -1 * wp('12.6%'),
  },
});

export default CheckAnswerScreen;
