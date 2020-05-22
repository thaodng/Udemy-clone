import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import SplashImage from '../../assets/images/splash.png';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SwiperScreen');
    }, 3000);
  }, []);

  return <ImageBackground style={style.bg} source={SplashImage} />;
};

export default SplashScreen;

const style = StyleSheet.create({
  bg: {
    flex: 1,
  },
});