import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {PLACEHOLDER, WHITE} from 'utils/color';
import {MEDIUM} from 'utils/font';
import {hp, wp} from 'utils/size';

interface IProps extends TextInputProps {
  bottom?: number;
  top?: number;
}

const Input: React.FC<IProps> = ({bottom = 0, top = 0, ...props}: IProps) => {
  return (
    <TextInput
      style={[styles.container, {marginTop: top, marginBottom: bottom}]}
      placeholderTextColor={PLACEHOLDER}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('84.6%'),
    height: hp('6.2%'),
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingHorizontal: wp('5.5%'),
    fontFamily: MEDIUM,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Input;
