import React from 'react'
import { StyleSheet, Alert, Share } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const PopupMenu = ({ style, item, colorDot }) => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const { id, title } = item;
  const msg = id !== undefined ? id : title;

  return (
    <Menu
      onSelect={value => value === 'Share' ? onShare(item) : Alert.alert(`${value} ${msg}`)}
      style={style}>
      <MenuTrigger>
        <Entypo
          name='dots-three-vertical'
          color={colorDot}
          size={20}
        />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value="Download" text="Download" />
        <MenuOption value="Bookmark" text="Bookmark" />
        <MenuOption value="Share" text="Share" />
      </MenuOptions>
    </Menu>
  )
}

export default PopupMenu

const styles = StyleSheet.create({})
