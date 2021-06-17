import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ArrowLeft from 'assets/images/arrow-left.svg';
import {BOLD} from 'utils/font';
import {hp, wp} from 'utils/size';

interface IProps {
  onPress?: () => void;
  title: string;
}

const Header: React.FC<IProps> = ({onPress, title}: IProps) => {
  return (
    <View style={styles.container}>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <ArrowLeft style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    paddingHorizontal: wp('7.7%'),
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: hp('3%'),
  },
  icon: {
    width: wp('2.8%'),
    height: hp('2.6%'),
  },
  button: {
    marginBottom: hp('4%'),
  },
  title: {
    fontFamily: BOLD,
    fontSize: 28,
  },
});

export default Header;
