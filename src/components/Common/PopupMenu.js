import React, { useContext } from 'react'
import { StyleSheet, Alert, Share } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { Context as AuthContext } from '../../context/AuthContext';


const PopupMenu = ({ style, item, colorDot }) => {
  const { state: { isAuthenticated, userInfo }, updateUserInfo } = useContext(AuthContext);

  const { id } = item;
  let valueFavorite, valueBookmark;

  // if (isAuthenticated) {
  //   valueFavorite = userInfo.favoriteCourses.includes(id) ? "UnFavorite" : "Favorite";
  //   valueBookmark = userInfo.bookmarkedCourses.includes(id) ? "UnBookmark" : "Bookmark";
  // }


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

  const onHandle = (value) => {
    switch (value) {
      case "Favorite":
        setUserInfo({
          ...userInfo,
          favoriteCourses: userInfo.favoriteCourses.concat(id)
        })
        break;

      case "UnFavorite":
        setUserInfo({
          ...userInfo,
          favoriteCourses: userInfo.favoriteCourses.filter(courseId => courseId !== id)
        })
        break;

      case "Bookmark":
        setUserInfo({
          ...userInfo,
          bookmarkedCourses: userInfo.bookmarkedCourses.concat(id)
        })
        break;

      case "UnBookmark":
        setUserInfo({
          ...userInfo,
          bookmarkedCourses: userInfo.bookmarkedCourses.filter(courseId => courseId !== id)
        })
        break;

      default:
        break;
    }
  };


  return (
    <>
      {
        isAuthenticated &&
        <Menu
          onSelect={value => value === 'Share' ? onShare(item) : onHandle(value)}
          style={style} >
          <MenuTrigger>
            <Entypo
              name='dots-three-vertical'
              color={colorDot}
              size={20}
            />
          </MenuTrigger>
          <MenuOptions>
            {/* <MenuOption value={"Download"} text="Download" /> */}
            <MenuOption value={valueFavorite} text={valueFavorite} />
            <MenuOption value={valueBookmark} text={valueBookmark} />
            <MenuOption value="Share" text="Share" />
          </MenuOptions>
        </Menu >
      }
    </>
  )
};

export default PopupMenu

const styles = StyleSheet.create({})
