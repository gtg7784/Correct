import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {hp, wp} from 'utils/size';

interface IProps extends TouchableOpacityProps {
  data: IWorkbook;
}

const Workbook: React.FC<IProps> = ({data, ...props}: IProps) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Image
        source={{uri: encodeURI(data.bookcover_url)}}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: wp('6.4%'),
  },
  image: {
    width: wp('26.9'),
    height: hp('17.2%'),
  },
});

export default Workbook;
