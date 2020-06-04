import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import ListCourses from '../ListCourses/ListCourses';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


const { width, height } = Layout.window;

const SearchResult = ({ route }) => {
  const { screenDetail, keyword, withMap } = route.params;
  const [activeTab, setActiveTab] = useState('ALL');

  const myLocation = {
    latitude: 10.763140,
    longitude: 106.682150,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  };


  const Tab = ({ title }) => {
    return (
      <View style={[styles.tab, activeTab === title ? styles.activeTab : null]}>
        <Text
          style={[styles.tabTitle, activeTab === title ? styles.activeTabTitle : null]}
          onPress={() => setActiveTab(title)}
        >
          {title}
        </Text>
      </View>
    )
  };

  const renderTabs = () => {
    return (
      <View style={styles.tabs}>
        <Tab title="ALL" />
        <Tab title="COURSES" />
        <Tab title="PATHS" />
        <Tab title="AUTHORS" />
      </View>
    );
  }

  const renderMap = () => {
    return (
      <View style={styles.map}>
        <MapView
          style={{ flex: 1, height: height * 0.5, width }}
          showsMyLocationButton
          initialRegion={myLocation}
        >
          <Marker coordinate={myLocation}>
            <View style={styles.myMarker}>
              <View style={styles.myMarkerDot} />
            </View>
          </Marker>

        </MapView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderTabs()}
      {withMap && renderMap()}
      <View style={{ flex: 1 }}>
        <ListCourses direction="column" screenDetail={screenDetail} />
      </View>
    </View>
  );
}

export default SearchResult

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  // tabs
  tabs: {
    // flex: 1,
    top: 0,
    width: width,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10
  },
  activeTab: {
    borderBottomColor: Colors.tintColor
  },
  activeTabTitle: {
    color: Colors.tintColor
  },
  map: {
    flex: 1
  },
  // my - marker
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(51, 83, 251, 0.2)"
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#3353FB"
  },
});
