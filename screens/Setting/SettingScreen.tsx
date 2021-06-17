import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Header from 'components/Header';
import {WHITE} from 'utils/color';

const SettingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="설정" />
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

export default SettingScreen;
