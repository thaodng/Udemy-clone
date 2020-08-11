import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import HeaderList from '../Common/HeaderList';
import Authors from '../Common/Authors';
import TopTab from '../Common/TopTab';
import ListCourses from '../ListCourses/ListCourses';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { SettingContext } from '../../context/SettingContext';
import { AuthorsContext } from '../../context/AuthorsContext';
import { getCoursesByAuthor } from '../../core/services/courses-service';
import myLocation from '../../mocks/location.json';

const { width, height } = Layout.window;


const SearchResult = ({ navigation, route }) => {
  const { screenDetail, withMap, dataCourses, dataAuthors } = route.params;
  const tabs = ['TẤT CẢ', 'KHOÁ HỌC', 'TÁC GIẢ']
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { authors } = useContext(AuthorsContext);

  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  // const renderMap = () => {
  //   return (
  //     <View style={styles.map}>
  //       <MapView
  //         style={{ flex: 1, height: height * 0.4, width }}
  //         showsMyLocationButton
  //         initialRegion={myLocation}
  //       >
  //         <Marker coordinate={myLocation}>
  //           <View style={styles.myMarker}>
  //             <View style={styles.myMarkerDot} />
  //           </View>
  //         </Marker>

  //       </MapView>
  //     </View>
  //   );
  // }

  const onPressAuthor = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    const data = getCoursesByAuthor(authorId);

    navigation.navigate(ScreenKey.SearchCoursesScreen, {
      screenDetail: ScreenKey.SearchCourseDetailScreen,
      subject: `${author.name}'s courses`,
      data: data
    });
  };

  const emptyResult = (content) => {
    return <Text style={{ ...styles.emptyText, color: txColor }}>
      {content}
    </Text>
  };

  const renderTab = (activeTab) => {
    switch (activeTab) {
      case tabs[0]:
        return (
          <>
            <HeaderList
              title="Khoá học"
              onPress={() => setActiveTab(tabs[1])}
            />
            {
              dataCourses.length > 0
                ? <ListCourses
                  direction="row"
                  txColor={txColor}
                  bgColor={bgColor}
                  data={dataCourses}
                  screenDetail={screenDetail}
                />
                : emptyResult('Không tồn tại khoá học theo yêu cầu!')
            }
            <View style={styles.divider} />

            <HeaderList
              title="Tác giả"
              onPress={() => setActiveTab(tabs[2])}
            />
            {
              dataAuthors.length > 0
                ? <Authors
                  authors={dataAuthors}
                  direction="row"
                  txColor={txColor}
                  onPress={onPressAuthor}
                />
                : emptyResult('Không tồn tại tác giả theo yêu cầu!')
            }
          </>
        )
        break;

      case tabs[1]:
        return (
          dataCourses.length > 0
            ? <ListCourses direction="column" txColor={txColor} bgColor={bgColor} data={dataCourses} screenDetail={screenDetail} />
            : emptyResult('Không tồn tại khoá học theo yêu cầu!')
        )
        break;

      case tabs[2]:
        return (
          activeTab === tabs[2] && dataAuthors.length > 0
            ? <Authors authors={dataAuthors} direction="column"  txColor={txColor} onPress={onPressAuthor} />
            : emptyResult('Không tồn tại tác giả theo yêu cầu!')
        )
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.container} >
      <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {
        // <ScrollView showsVerticalScrollIndicator={false}>
        // </ScrollView>
        // {withMap && renderMap()}
        //
      }
      <View style={{ flex: 1 }}>
        {
          renderTab(activeTab)
        }
      </View>

    </View >
  );
}

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  emptyText: {
    width: width,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  divider: {
    height: 10
  }
});
