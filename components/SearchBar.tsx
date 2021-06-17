import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {hp, wp} from 'utils/size';
import {MEDIUM} from 'utils/font';
import {BLACK, WHITE} from 'utils/color';
import SearchIcon from 'assets/images/search.svg';

interface IProps extends TextInputProps {
  top?: number;
}

const SearchBar: React.FC<IProps> = ({top = 0, ...props}: IProps) => {
  return (
    <View style={[styles.container, {marginTop: top}]}>
      <TextInput style={styles.input} {...props} />
      <SearchIcon style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('84.6%'),
    height: hp('6.2%'),
    position: 'relative',
  },
  input: {
    width: wp('84.6%'),
    height: hp('6.2%'),
    borderRadius: 8,
    paddingLeft: wp('13.1%'),
    fontFamily: MEDIUM,
    fontSize: 18,
    color: BLACK,
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
  icon: {
    position: 'absolute',
    left: wp('6.1%'),
    top: hp('2%'),
    width: wp('4.4%'),
    height: hp('2%'),
  },
});

export default SearchBar;
