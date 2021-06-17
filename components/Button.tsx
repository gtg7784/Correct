import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {MAIN, WHITE} from 'utils/color';
import {BOLD} from 'utils/font';
import {hp, wp} from 'utils/size';

interface IProps extends TouchableOpacityProps {
  label: string;
}

const Button: React.FC<IProps> = ({label = '', ...props}: IProps) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('84.6%'),
    height: hp('6.2%'),
    backgroundColor: MAIN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  label: {
    fontFamily: BOLD,
    fontSize: 18,
    color: WHITE,
  },
});

export default Button;
