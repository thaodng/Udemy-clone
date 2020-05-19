import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import DownloadStackNavigator from './DownloadStackNavigator';
import BrowseStackNavigator from './BrowseStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import TabBarIcon from '../components/Common/TabBarIcon';



const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>

      <BottomTab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
      />

      <BottomTab.Screen
        name="DownloadStackNavigator"
        component={DownloadStackNavigator}
        options={{
          title: 'Download',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="file-download" />,
        }}
      />
      <BottomTab.Screen
        name="BrowseStackNavigator"
        component={BrowseStackNavigator}
        options={{
          title: 'Browse',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="apps" />,
        }}
      />
      <BottomTab.Screen
        name="SearchStackNavigator"
        component={SearchStackNavigator}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
        }}
      />

      <BottomTab.Screen
        name="AccountStackNavigator"
        component={AccountStackNavigator}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="account-circle" />,
        }}
      />

    </BottomTab.Navigator>
  );
}

// function getHeaderTitle(route) {
//   const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

//   switch (routeName) {
//     case 'Home':
//       return 'How to get started';
//     case 'Links':
//       return 'Links to learn more';
//   }
// }
