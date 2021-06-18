import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import {BLACK, GRAY, WHITE} from 'utils/color';
import {hp, wp} from 'utils/size';
import {RootState} from 'store/reducers';
import api from 'api';
import {getToken} from 'api/jwt';
import {BOLD, MEDIUM} from 'utils/font';
import Workbook from 'components/Workbook';
import {englishSubjects, sortBySubject, subjects} from 'utils/workbook';
import {useNavigation} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: RootState) => state.user);
  const [searchValue, setSearchValue] = useState('');
  const [workbook, setWorkbooks] = useState<ISortedWorkbooks>({});
  const [markedWorkbook, setMarkedWorkbook] = useState<IWorkbook[]>([]);

  useEffect(() => {
    SplashScreen.hide();
    searchWorkbook(searchValue);
    getMarkedWorkbook();
  }, [searchValue]);

  const getMarkedWorkbook = async () => {
    const token = await getToken();
    const response = await api.get('/workbooks/marks/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    if (response.status === 200) {
      setMarkedWorkbook(response.data.workbook ?? []);
    }
  };

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

  const onPressWorkbook = (data: IWorkbook) => {
    navigation.navigate('SelectQuestionCheckNumberScreen', {
      workbookId: data.id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${user?.name}님, 오늘도 \n열심히 공부하세요!`} />
      <SearchBar
        top={hp('4.3%')}
        placeholder="문제집의 이름을 입력해주세요."
        value={searchValue}
        onChangeText={text => setSearchValue(text)}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.flatListWrap}>
          <View style={styles.flatListTitleWrap}>
            <Text style={styles.flatListTitle}>최근 기록</Text>
          </View>
          {markedWorkbook.length === 0 ? (
            <Text style={styles.flatListNotFoundText}>
              최근 기록이 존재하지 않습니다.
            </Text>
          ) : (
            <FlatList
              horizontal
              keyExtractor={(item, index) => `${item.subject}-${index}`}
              data={markedWorkbook}
              style={styles.flatList}
              renderItem={data => (
                <Workbook
                  data={data.item}
                  onPress={() => onPressWorkbook(data.item)}
                />
              )}
            />
          )}
        </View>
        <View style={styles.flatListWrap}>
          <View style={styles.flatListTitleWrap}>
            <Text style={styles.flatListTitle}>
              사람들이 많이 검색한 문제집
            </Text>
          </View>
          {markedWorkbook.length === 0 ? (
            <Text style={styles.flatListNotFoundText}>
              최근 기록이 존재하지 않습니다.
            </Text>
          ) : (
            <FlatList
              horizontal
              keyExtractor={(item, index) => `${item.subject}-${index}`}
              data={markedWorkbook}
              style={styles.flatList}
              renderItem={data => (
                <Workbook
                  data={data.item}
                  onPress={() => onPressWorkbook(data.item)}
                />
              )}
            />
          )}
        </View>
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

export default HomeScreen;
