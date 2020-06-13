import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import HeaderList from '../Common/HeaderList';
import Authors from '../Common/Authors';
import ListCourses from '../ListCourses/ListCourses';
import { AuthorsContext } from '../../context/AuthorsContext';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import ScreenKey from '../../constants/ScreenKey';

import { getCoursesByAuthor } from '../../core/services/courses-service';

import myLocation from '../../mocks/location.json';

const { width, height } = Layout.window;

const SearchResult = ({ navigation, route }) => {
  const { screenDetail, withMap, dataCourses, dataAuthors } = route.params;
  const [activeTab, setActiveTab] = useState('ALL');
  const { authors } = useContext(AuthorsContext);

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
        {/* <Tab title="PATHS" /> */}
        <Tab title="AUTHORS" />
      </View>
    );
  }

  const renderMap = () => {
    return (
      <View style={styles.map}>
        <MapView
          style={{ flex: 1, height: height * 0.4, width }}
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

  const onPressAuthor = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    const data = getCoursesByAuthor(authorId);

    navigation.navigate(ScreenKey.SearchCoursesScreen, {
      screenDetail: ScreenKey.SearchCourseDetailScreen,
      subject: `${author.name}'s courses`,
      data: data
    });
  };

  return (
    <View style={styles.container} >
      {renderTabs()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {withMap && renderMap()}
        <View style={{ flex: 1 }}>
          {
            dataCourses.length > 0 && (activeTab === 'ALL' || activeTab === 'COURSES') &&
            <>
              <HeaderList title="Courses" />
              <ListCourses direction="row" data={dataCourses} screenDetail={screenDetail} />
            </>
          }
          {
            dataAuthors.length > 0 && (activeTab === 'ALL' || activeTab === 'AUTHORS') &&
            <>
              <HeaderList title="Authors" />
              <Authors authors={dataAuthors} onPress={onPressAuthor} />
            </>
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default SearchResult;

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
