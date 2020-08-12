import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteStackNavigator from './FavoriteStackNavigator';
import DownloadStackNavigator from './DownloadStackNavigator';
import BrowseStackNavigator from './BrowseStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import TabBarIcon from '../components/Common/TabBarIcon';

import { Context as AuthContext } from '../context/AuthContext';
import { SettingContext } from '../context/SettingContext';

import Colors from '../constants/Colors';
import ScreenKey from '../constants/ScreenKey';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation, route }) => {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  const { state: { isAuthenticated } } = useContext(AuthContext);
  const { userSettings } = useContext(SettingContext);
  const bg = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;

  console.log(isAuthenticated);
  
  return (
    <BottomTab.Navigator
      initialRouteName={ScreenKey.BrowseTabStackNavigator}
      tabBarOptions={{
        style: {
          backgroundColor: bg
        }
      }}
    >
      {
        isAuthenticated &&
        <>
          <BottomTab.Screen
            name={ScreenKey.FavoriteTabStackNavigator}
            component={FavoriteStackNavigator}
            options={{
              title: 'Favorite',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="favorite" />,
            }}
          />
          <BottomTab.Screen
            name={ScreenKey.DownloadTabStackNavigator}
            component={DownloadStackNavigator}
            options={{
              title: 'Download',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="file-download" />,
            }}
          />
        </>
      }

      <BottomTab.Screen
        name={ScreenKey.BrowseTabStackNavigator}
        component={BrowseStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="apps" />,
        }}
      />
      <BottomTab.Screen
        name={ScreenKey.SearchTabStackNavigator}
        component={SearchStackNavigator}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
        }}
      />

      <BottomTab.Screen
        name={ScreenKey.AccountTabStackNavigator}
        component={AccountStackNavigator}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="account-circle" />,
        }}
      />

    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;