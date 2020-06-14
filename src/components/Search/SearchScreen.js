import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import RowItem from '../Common/RowItem';
import SearchBar from './SearchBar';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { SettingContext } from '../../context/SettingContext';

import { getCoursesByTitle } from '../../core/services/courses-service';
import { getAuthorsByName } from '../../core/services/authors-service';

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

  const onSearch = (term) => {
    if (term) {
      const dataCourses = getCoursesByTitle(term);
      const dataAuthors = getAuthorsByName(term);

      navigation.navigate(ScreenKey.SearchResultScreen,
        {
          screenDetail: ScreenKey.SearchCourseDetailScreen,
          keyword: term,
          dataCourses,
          dataAuthors,
          withMap
        });
    }
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

        <View style={styles.recentBar}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: txColor }}>Top categories</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={topCategories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderItem({ title: item.title, icon: item.icon, rightIcon: true })}
        />

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

