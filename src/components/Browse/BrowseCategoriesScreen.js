import React, { useContext } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { SettingContext } from '../../context/SettingContext';

import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { getCoursesByCategory } from '../../core/services/courses-service';

const W = Dimensions.get('window').width / 4;

const RowItem = ({ name, rightIcon, onPress, txColor, bgColor }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.itemContainer, backgroundColor: bgColor }}
      onPress={onPress}
    >
      <Text style={[styles.itemText, { color: txColor }]}>{name}</Text>
      {rightIcon && <FontAwesome name="angle-right" size={20} color={txColor} />}
    </TouchableOpacity>
  )
}



const BrowseCategoriesScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;

  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const onPressCategory = async (name, categoryId) => {
    const { data: { payload: { rows } } } = await getCoursesByCategory({ categoryId });

    navigation.navigate(ScreenKey.BrowseCoursesScreen, {
      screenDetail: ScreenKey.BrowseCourseDetailScreen,
      subject: `${name}`,
      data: rows
    });
  };

  const renderItem = ({ id, name, rightIcon }) => {
    return (
      <RowItem
        name={name}
        rightIcon={rightIcon}
        onPress={() => onPressCategory(name, id)}
        txColor={txColor}
        bgColor={bgColor}
      />
    );
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderItem({ id: item.id, name: item.name, rightIcon: true })
        }
      />
    </>
  );
};

export default BrowseCategoriesScreen;

const styles = StyleSheet.create({
  button: {
    padding: 5
  },
  title: {
    color: Colors.lightText,
    padding: 8,
    textAlign: 'center',
    backgroundColor: Colors.tintColor,
    borderRadius: 8
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
});