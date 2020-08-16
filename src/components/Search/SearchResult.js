import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "react-i18next";
import HeaderList from '../Common/HeaderList';
import Authors from '../Common/Authors';
import TopTab from '../Common/TopTab';
import ListCourses from '../ListCourses/ListCourses';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { SettingContext } from '../../context/SettingContext';
import { getCoursesByAuthor } from '../../core/services/courses-service';
import { searchCourseAndAuthor } from '../../core/services/search-service';

const { width, height } = Layout.window;

const OFFSET = 0;
const LIMIT = 3;

const SearchResult = ({ navigation, route }) => {
  const { screenDetail, keyword, withMap } = route.params;
  const [t] = useTranslation('common');
  const tabs = [t('searchScreen.ALL'), t('searchScreen.COURSES'), t('searchScreen.AUTHORS')]
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;


  const [loading, setLoading] = useState(true);
  const [dataCourses, setDataCourses] = useState([]);
  const [dataAuthors, setDataAuthors] = useState([]);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [coursesOffset, setCoursesOffset] = useState(0);
  const [authorsOffset, setAuthorsOffset] = useState(0);


  useEffect(() => {
    const search = async () => {

      const searchObject = { keyword, 'offset': OFFSET, 'limit': LIMIT };
      const { data: { message, payload } } = await searchCourseAndAuthor({ searchObject });
      const { courses, instructors } = payload;

      setDataCourses(prevState => [...prevState, ...courses.data]);
      setCoursesOffset(coursesOffset + 1);

      setDataAuthors(prevState => [...prevState, ...instructors.data]);
      setAuthorsOffset(authorsOffset + 1);

      setLoading(false);
    }

    search();
  }, [])


  const loadMoreCourses = async () => {
    console.log(coursesOffset);
    setFetchingFromServer(true);

    const searchObject = { keyword, 'offset': coursesOffset * LIMIT, 'limit': LIMIT };
    const { data: { message, payload } } = await searchCourseAndAuthor({ searchObject });
    const { courses } = payload;

    setDataCourses(prevState => [...prevState, ...courses.data]);
    setCoursesOffset(coursesOffset + 1);

    setFetchingFromServer(false);
    setLoading(false);
  };


  const loadMoreAuthors = async () => {
    setFetchingFromServer(true);

    const searchObject = { keyword, 'offset': authorsOffset * LIMIT, 'limit': LIMIT };
    const { data: { message, payload } } = await searchCourseAndAuthor({ searchObject });
    const { instructors } = payload;

    // setDataAuthors(prevState => [...prevState, ...instructors.data]);
    setAuthorsOffset(authorsOffset + 1);

    setFetchingFromServer(false);
    setLoading(false);
  };


  const renderFooter = (type) => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={type === 'course' ? loadMoreCourses : loadMoreAuthors}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>{t('searchScreen.loadMore')}</Text>
          {fetchingFromServer ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
    // 
  }

  const onPressAuthor = (authorId) => {
    const author = dataAuthors.find(a => a.id === authorId);
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
              title={t('searchScreen.courses')}
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
                  ListFooterComponent={renderFooter('course')}
                />
                : emptyResult(t('searchScreen.coursesNoutFound'))
            }
            <View style={styles.divider} />

            <HeaderList
              title={t('searchScreen.authors')}
              onPress={() => setActiveTab(tabs[2])}
            />
            {
              dataAuthors.length > 0
                ? <Authors
                  authors={dataAuthors}
                  direction="row"
                  txColor={txColor}
                  onPress={onPressAuthor}
                  ListFooterComponent={renderFooter('author')}
                />
                : emptyResult(t('searchScreen.authorsNotFound'))
            }
          </>
        )

      case tabs[1]:
        return (
          dataCourses.length > 0
            ? <ListCourses
              direction="column"
              txColor={txColor}
              bgColor={bgColor}
              data={dataCourses}
              screenDetail={screenDetail}
              ListFooterComponent={renderFooter('course')}
            />
            : emptyResult(t('searchScreen.coursesNoutFound'))
        )
        break;

      case tabs[2]:
        return (
          activeTab === tabs[2] && dataAuthors.length > 0
            ? <Authors
              authors={dataAuthors}
              direction="column"
              txColor={txColor}
              onPress={onPressAuthor}
              ListFooterComponent={() => renderFooter('author')}
            />
            : emptyResult(t('searchScreen.authorsNotFound'))
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
          loading
            ? (<ActivityIndicator size="large" />)
            : renderTab(activeTab)
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
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: Colors.tintColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});


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