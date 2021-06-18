import React from 'react';
import {StyleSheet, TextInputProps, TextInput} from 'react-native';
import {BLACK, WHITE} from 'utils/color';
import {MEDIUM} from 'utils/font';
import {hp, wp} from 'utils/size';

interface IProps extends TextInputProps {
  top?: number;
}
const TextArea = ({top = 0, ...props}: IProps) => (
  <TextInput
    style={[
      styles.container,
      {
        marginTop: top,
      },
    ]}
    multiline
    {...props}
  />
);

const styles = StyleSheet.create({
  container: {
    width: wp('84.6%'),
    height: hp('54.6%'),
    borderRadius: 8,
    paddingTop: hp('2.5%'),
    paddingHorizontal: wp('4.6%'),
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
    color: BLACK,
    backgroundColor: WHITE,
  },
});

export default TextArea;
