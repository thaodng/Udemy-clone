import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ImageBackground, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import { Entypo } from '@expo/vector-icons'
import courses from '../../mooks/courses.json';
import Colors from '../../constants/Colors';

const SearchResult = ({ route }) => {
  const navigation = useNavigation();
  const { keyword } = route.params;
  const myLocation = {
    latitude: 10.763140,
    longitude: 106.682150,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  };

  const [activeTab, setActiveTab] = useState('ALL');
  // const filters = ['all', 'courses', 'paths', 'authors'];

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

  const renderResults = () => {

    return courses.map(course => {
      return (
        <View
          key={`course-${course.id}`}
          style={styles.course}>
          {<ImageBackground
            style={styles.courseImage}
            imageStyle={styles.courseImage}
            source={{ uri: course.preview }}
          />}

          <View style={styles.courseDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {course.title}
              </Text>
              <Text style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                {course.author.name}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>

              <View style={styles.courseInfo}>
                <Entypo name="star" color={Colors.tintColor} size={12} />
                <Text style={{ marginLeft: 4, color: Colors.tintColor }}>
                  {course.rating}
                </Text>
              </View>

              <View style={styles.courseInfo}>
                <Entypo
                  name="location-pin"
                  color={Colors.tintColor}
                  size={12}
                />
                <Text style={{ marginLeft: 4, color: Colors.tintColor }}>
                  {course.reviews} kms
                </Text>
              </View>

              {/* <View style={styles.courseInfo}>
                <Icon.Ionicons name="md-pricetag" color="black" size={12} />
                <Text style={{ marginLeft: 4, color: "black" }}>
                  {course.price}
                </Text>
              </View> */}
            </View>
          </View>

          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <Entypo
              name="dots-three-vertical"
              color="#A5A5A5"
              size={24}
            />
          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      {renderTabs()}
      {renderMap()}
      <ScrollView style={styles.map}>
        {renderResults()}
      </ScrollView>
    </View>
  );
}

export default SearchResult

const { width, height } = Dimensions.get("screen");
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
  course: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 0.5,
    padding: 20
  },
  courseImage: {
    width: width * 0.3,
    height: width * 0.25,
    borderRadius: 6
  },
  courseDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14
  },
})
