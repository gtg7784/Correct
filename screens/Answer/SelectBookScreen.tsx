import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import {BLACK, GRAY, WHITE} from 'utils/color';
import {useNavigation} from '@react-navigation/native';
import Workbook from 'components/Workbook';
import {hp, wp} from 'utils/size';
import {englishSubjects, sortBySubject, subjects} from 'utils/workbook';
import {BOLD, MEDIUM} from 'utils/font';
import api from 'api';
import {getToken} from 'api/jwt';

const SelectBookScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [workbook, setWorkbooks] = useState<ISortedWorkbooks>({});

  useEffect(() => {
    searchWorkbook(searchValue);
  }, [searchValue]);

  const searchWorkbook = async (data: string) => {
    const token = await getToken();
    const response = await api.get('/workbooks', {
      params: {
        search: data,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    if (response.status === 200) {
      const sortedWorkbooks = sortBySubject(response.data);

      setWorkbooks(sortedWorkbooks);
    }
  };

  const onPressWorkbook = (data: IWorkbook) => {
    navigation.navigate('SelectQuestionNumberScreen', {
      workbookId: data.id,
    });
  };

  const renderWorkbooks = () => {
    let workbookFlatlist = [];
    for (const [key, value] of Object.entries(workbook)) {
      const subjectIdx = englishSubjects.indexOf(key as SubjectEnglishType);
      const subjectName = subjects[subjectIdx];

      workbookFlatlist.push(
        <View style={styles.flatListWrap} key={key}>
          <View style={styles.flatListTitleWrap}>
            <Text style={styles.flatListTitle}>{subjectName}</Text>
          </View>
          {value.length === 0 ? (
            <Text style={styles.flatListNotFoundText}>
              문제집이 등록되지 않았습니다.
            </Text>
          ) : (
            <FlatList
              horizontal
              keyExtractor={(item, index) => `${item.subject}-${index}`}
              data={value}
              style={styles.flatList}
              renderItem={data => (
                <Workbook
                  data={data.item}
                  onPress={() => onPressWorkbook(data.item)}
                />
              )}
            />
          )}
        </View>,
      );
    }
    return workbookFlatlist;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="문제집 답지 등록" />
      <SearchBar
        top={hp('4.3%')}
        placeholder="문제집 이름을 등록해주세요"
        value={searchValue}
        onChangeText={text => setSearchValue(text)}
      />
      <ScrollView style={styles.scrollContainer}>
        {renderWorkbooks()}
      </ScrollView>
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
  scrollContainer: {
    width: '100%',
  },
  flatList: {
    marginTop: hp('2.4%'),
    paddingLeft: wp('7.7%'),
  },
  flatListWrap: {
    marginTop: hp('5.1%'),
  },
  flatListTitleWrap: {
    flexDirection: 'row',
    marginLeft: wp('7.7%'),
  },
  flatListTitle: {
    fontSize: 18,
    fontFamily: BOLD,
    color: BLACK,
  },
  flatListNotFoundText: {
    fontSize: 18,
    fontFamily: MEDIUM,
    color: GRAY,
    textAlign: 'center',
    width: '100%',
    marginVertical: hp('3%'),
  },
});

export default SelectBookScreen;
