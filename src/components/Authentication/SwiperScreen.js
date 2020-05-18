import React, { useState } from 'react'
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

const BrowseLogin = ({ animateSignUp, animateLogin }) => {
  const navigation = useNavigation();
  
  return (
    <View style={{ flexDirection: 'row' }}>
      <Animable.View
        animation={animateSignUp}
        delay={0}
        duration={1500}
        useNativeDriver>
        <TouchableOpacity
          style={{ ...styles.button, borderColor: '#3465d9', borderWidth: 1, borderRadius: 50, marginTop: 15 }}
          onPress={() => { navigation.navigate('BrowseTabNavigator') }}
        >
          <Text style={{ color: '#3465d9' }}> Browse </Text>
        </TouchableOpacity>
      </Animable.View>

      <Animable.View
        animation={animateLogin}
        delay={0}
        duration={1500}
        useNativeDriver>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: '#3465d9', marginLeft: 20, borderWidth: 1, borderRadius: 50, marginTop: 15 }}
          onPress={() => { navigation.navigate('LoginScreen') }}>
          <Text style={{ color: 'white' }}> Login </Text>
        </TouchableOpacity>
      </Animable.View>
    </View>
  );
};

const Slide = ({ image, title, text, children }) => {
  return (
    <>
      <View style={styles.header}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="stretch"
        >
        </Image>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        {children}
      </View>
    </>
  );
};

const SwiperScreen = () => {
  const [animateSignUp, setAnimateSignUp] = useState(null);
  const [animateLogin, setAnimateLogin] = useState(null);

  const onIndexChanged = (index) => {
    if (index == 0) {
      setAnimateSignUp('bounceInLeft');
      setAnimateLogin('bounceInRight');
    } else {
      setAnimateSignUp(null);
      setAnimateLogin(null);
    }
  };

  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      onIndexChanged={(index) => onIndexChanged(index)}
    >

      <View style={styles.slide}>
        <Slide
          image={require('../../assets/images/asset1.png')}
          title="Take the video courses"
          text="From cooking to coding and everything in between"
        />
      </View>


      <View style={styles.slide}>
        <Slide
          image={require('../../assets/images/asset2.png')}
          title="Learn from experts"
          text="Approachable expert-instructors, vetted by million student"
        />
      </View>

      <View style={styles.slide}>
        <Slide
          image={require('../../assets/images/asset3.png')}
          title="Go at your home space"
          text="Watch video courses anytime, anywhere"
        >
          <BrowseLogin
            animateSignUp={animateSignUp}
            animateLogin={animateLogin}
          />
        </Slide>
      </View>
    </Swiper>
  )
}

export default SwiperScreen;


const { width, height } = Dimensions.get('screen');
const height_image = height * 0.5 * 0.8;
const width_image = height_image * 1.1;
const width_button = width * 0.3;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  image: {
    height: height_image,
    width: width_image,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3465d9',
    textAlign: 'center'
  },
  text: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20
  },
  dot: {
    backgroundColor: `rgba(52,101,217,.4)`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3
  },
  activeDot: {
    backgroundColor: '#3465d9',
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3
  },
  button: {
    width: width_button,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
