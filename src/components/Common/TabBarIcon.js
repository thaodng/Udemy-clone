import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const TabBarIcon = ({ name, focused }) => {
  return (
    <MaterialIcons
      name={name}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

export default TabBarIcon;