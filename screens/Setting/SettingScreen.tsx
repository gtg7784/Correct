import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from 'components/Header';
import {BLACK, LIGHTGRAY, RED, WHITE} from 'utils/color';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {BOLD, MEDIUM} from 'utils/font';
import {hp, wp} from 'utils/size';
import {CommonActions, useNavigation} from '@react-navigation/native';
import ArrowRight from 'assets/images/arrow-right.svg';
import InfoIcon from 'assets/images/info.svg';
import NoticeIcon from 'assets/images/notice.svg';
import SirenIcon from 'assets/images/siren.svg';
import {clearToken} from 'api/jwt';

const SettingScreen: React.FC = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  const onPressArrow = () => {
    navigation.navigate('ProfileScreen');
  };

  const onPressNotice = () => {
    navigation.navigate('NoticeScreen');
  };

  const onPressReport = () => {
    navigation.navigate('ReportScreen');
  };

  const onPressLogout = () => {
    clearToken();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'LoginStack',
          },
        ],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="설정" />
      <View style={styles.userInfoWrap}>
        <View>
          <Text style={styles.userNameText}>{user?.name}</Text>
          <Text style={styles.userEmailText}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={onPressArrow}>
          <ArrowRight style={styles.userArrowIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.listWrap}>
        <TouchableOpacity style={styles.listItemWrap}>
          <View style={styles.listLabelWrap}>
            <InfoIcon style={styles.listIcon} />
            <Text style={styles.listLabelText}>버전 정보</Text>
          </View>
          <Text style={styles.listValueText}>최신 버전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listLabelWrap} onPress={onPressNotice}>
          <NoticeIcon style={styles.listIcon} />
          <Text style={styles.listLabelText}>공지사항</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listWrap}>
        <TouchableOpacity>
          <TouchableOpacity
            style={styles.listLabelWrap}
            onPress={onPressReport}>
            <SirenIcon style={styles.listIcon} />
            <Text style={styles.listLabelText}>오류 신고</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listLabelWrap} onPress={onPressLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
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
  },
  userInfoWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('7.7%'),
    marginTop: hp('4.6%'),
  },
  userNameText: {
    fontSize: 22,
    fontFamily: BOLD,
    marginBottom: hp('0.9%'),
    textAlign: 'left',
  },
  userEmailText: {
    fontSize: 18,
    fontFamily: MEDIUM,
    textAlign: 'left',
  },
  userArrowIcon: {
    width: wp('1.8%'),
    height: hp('1.7%'),
  },
  listWrap: {
    width: wp('84.6%'),
    height: hp('15%'),
    marginTop: hp('4.6%'),
    paddingHorizontal: wp('7.4%'),
    paddingVertical: hp('3%'),
    justifyContent: 'space-between',
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
  listItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listIcon: {
    marginRight: wp('5.2%'),
  },
  listLabelText: {
    fontSize: 18,
    color: BLACK,
    fontFamily: MEDIUM,
  },
  listValueText: {
    fontSize: 18,
    color: LIGHTGRAY,
    fontFamily: MEDIUM,
  },
  logoutText: {
    fontSize: 18,
    color: RED,
    fontFamily: MEDIUM,
  },
});

export default SettingScreen;
