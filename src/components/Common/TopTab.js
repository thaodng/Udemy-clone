import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const { width, height } = Layout.window;

const TopTab = ({ tabs, activeTab, setActiveTab }) => {
  const Tab = ({ title }) => {
    return (
      <View style={[styles.tab, activeTab === title ? styles.activeTab : null]}>
        <Text
          style={[styles.tabTitle, activeTab === title ? styles.activeTabTitle : {color: Colors.lightGray}]}
          onPress={() => setActiveTab(title)}
        >
          {title}
        </Text>
      </View>
    )
  };

  return (
    <View style={styles.tabs}>
      {
        tabs.map(tab => <Tab key={tab} title={tab} />)
      }
    </View>
  );
}

export default TopTab;

const styles = StyleSheet.create({
  // tabs
  tabs: {
    // flex: 1,
    top: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    // marginBottom: 10
  },
  activeTab: {
    borderBottomColor: Colors.tintColor
  },
  activeTabTitle: {
    color: Colors.tintColor
  },
});