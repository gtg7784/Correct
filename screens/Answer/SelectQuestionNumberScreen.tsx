import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View, Image, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Header from 'components/Header';
import {BLACK, WHITE} from 'utils/color';
import api from 'api';
import {getToken} from 'api/jwt';
import {hp, wp} from 'utils/size';
import {BOLD, MEDIUM} from 'utils/font';
import Input from 'components/Input';
import Button from 'components/Button';

const SelectQuestionNumberScreen: React.FC = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<AnswerStackType, 'SelectQuestionNumberScreen'>>();
  const [workbook, setWorkbook] = useState<IWorkbook>();
  const [firstNumber, setFirstNumber] = useState<string>();
  const [lastNumber, setLastNumber] = useState<string>();

  useEffect(() => {
    const {workbookId} = route.params;

    getWorkBook(workbookId as number);
  }, [route.params]);

  const getWorkBook = async (id: number) => {
    const token = await getToken();
    const response = await api.get(`/workbooks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setWorkbook(response.data);
  };

  const onPressNext = () => {
    const {workbookId} = route.params;
    if (
      parseInt(firstNumber as string, 10) > parseInt(lastNumber as string, 10)
    ) {
      Alert.alert('입력된 번호가 잘못되었습니다.');
      return;
    }

    if (firstNumber?.length && lastNumber?.length) {
      navigation.navigate('WriteAnswerScreen', {
        workbookId: workbookId,
        firstNumber: firstNumber,
        lastNumber: lastNumber,
      });
      return;
    }

    Alert.alert('입력되지 않은 번호가 있습니다.');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="작성" onPress={() => navigation.goBack()} />
      <View style={styles.workbookWrap}>
        <View>
          <Text style={styles.workbookName}>
            {workbook?.name.length! > 24
              ? `${workbook?.name.substr(0, 24)}...`
              : workbook?.name}
          </Text>
          <Text style={styles.workbookSubject}>{workbook?.subject}</Text>
        </View>
        <Image
          style={styles.workbookImage}
          source={{uri: encodeURI(workbook?.bookcover_url as string)}}
        />
      </View>
      <Text style={styles.labelText}>처음 문제 번호</Text>
      <Input
        value={firstNumber}
        onChangeText={text => setFirstNumber(text)}
        top={hp('2.5%')}
        keyboardType="decimal-pad"
      />
      <Text style={styles.labelText}>마지막 문제 번호</Text>
      <Input
        value={lastNumber}
        onChangeText={text => setLastNumber(text)}
        top={hp('2.5%')}
        keyboardType="decimal-pad"
      />
      <Button label="다음" style={styles.button} onPress={onPressNext} />
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
  workbookWrap: {
    width: wp('84.6%'),
    height: hp('12.9%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3.2%'),
    paddingHorizontal: wp('5.6%'),
    borderRadius: 8,
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  workbookName: {
    width: wp('53.1%'),
    fontSize: 18,
    fontFamily: BOLD,
    color: BLACK,
  },
  workbookSubject: {
    fontSize: 14,
    fontFamily: MEDIUM,
    color: BLACK,
    marginTop: hp('0.8%'),
  },
  workbookImage: {
    width: wp('14.4'),
    height: hp('9.2%'),
  },
  labelText: {
    marginTop: hp('6.2%'),
    width: wp('84.6%'),
    fontSize: 18,
    fontFamily: MEDIUM,
    textAlign: 'left',
  },
  button: {
    position: 'absolute',
    bottom: hp('3.3%'),
  },
});

export default SelectQuestionNumberScreen;
