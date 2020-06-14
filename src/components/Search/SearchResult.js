import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import HeaderList from '../Common/HeaderList';
import Authors from '../Common/Authors';
import TopTab from '../Common/TopTab';
import ListCourses from '../ListCourses/ListCourses';
import Layout from '../../constants/Layout';
import ScreenKey from '../../constants/ScreenKey';

import { AuthorsContext } from '../../context/AuthorsContext';
import { getCoursesByAuthor } from '../../core/services/courses-service';
import myLocation from '../../mocks/location.json';

const { width, height } = Layout.window;

const SearchResult = ({ navigation, route }) => {
  const { screenDetail, withMap, dataCourses, dataAuthors } = route.params;
  const tabs = ["ALL", "COURSES", "AUTHORS"]
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { authors } = useContext(AuthorsContext);

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
      <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
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
