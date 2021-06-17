import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import {WHITE} from 'utils/color';
import {hp} from 'utils/size';

const SelectBookScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="문제집 답지 등록" />
      <SearchBar top={hp('4.3%')} placeholder="문제집 이름을 등록해주세요" />
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

export default SelectBookScreen;
