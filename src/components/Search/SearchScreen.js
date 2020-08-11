import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import RowItem from '../Common/RowItem';
import SearchBar from './SearchBar';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import {
  searchCourseAndAuthor,
  searchHistory,
  deleteHistory
} from '../../core/services/search-service';

import { SettingContext } from '../../context/SettingContext';

import topCategories from '../../mocks/top-categories.json';

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [withMap, setWithMap] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);

  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const updateRecentSearch = (searchTerm) => {
    setRecentSearch([...recentSearch, { id: searchTerm, title: searchTerm }]);
  };

  useEffect(() => {
    // const loadHistory = async () => {
    //   if (categories.length === 0) {
    //     const { message, payload } = await getCategories();
    //     if (message === 'OK') {
    //       setCategories(payload);
    //     } else {
    //       Alert.alert('Lỗi khi load danh sách danh mục!');
    //     }
    //   }
    // };

    // loadHistory();
  }, []);


  // Search object { "keyword": "h", "limit": 10, "offset": 1}
  const onSearch = async (term) => {
    if (term) {
      const searchObject = { "keyword": term, "limit": 10, "offset": 1 };

      const { data: { message, payload } } = await searchCourseAndAuthor({ searchObject });
      const { courses, instructors } = payload;

      if (message === 'OK') {
        navigation.navigate(ScreenKey.SearchResultScreen,
          {
            screenDetail: ScreenKey.SearchCourseDetailScreen,
            keyword: term,
            dataCourses: courses.data,
            dataAuthors: instructors.data,
            withMap
          });
      }
    };
  };

  const renderItem = ({ title, icon, rightIcon }) => {
    return (
      <RowItem
        icon={icon}
        title={title}
        rightIcon={rightIcon}
        onPress={() => onSearch(title)}
        txColor={txColor}
        bgColor={bgColor}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        term={term}
        setTerm={setTerm}
        withMap={withMap}
        setWithMap={setWithMap}
        updateRecentSearch={updateRecentSearch}
        onSearch={onSearch}
        txColor={txColor}
        bgColor={bgColor}
      />
      <View style={styles.shadow}>
        {
          (recentSearch.length > 0) &&
          <>
            <View style={styles.recentBar}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: txColor }} >Recent searches</Text>
              <TouchableOpacity onPress={() => {
                setRecentSearch([]);
                setTerm('');
              }}>
                <Text style={{ color: Colors.tintColor }}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={recentSearch}
              keyExtractor={item => item.id}
              renderItem={({ item }) => renderItem({ title: item.title, icon: 'replay', rightIcon: false })}
            />
          </>
        }

        {
          /* 
            <FlatList
              showsVerticalScrollIndicator={false}
              data={topCategories}
              keyExtractor={item => item.id}
              renderItem={({ item }) => renderItem({ title: item.title, icon: item.icon, rightIcon: true })}
            /> 
          */
        }

      </View>

    </SafeAreaView>
  )
};


export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  recentBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10
  }
})

