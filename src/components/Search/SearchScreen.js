import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import RowItem from '../Common/RowItem';
import SearchBar from './SearchBar';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import categories from '../../mocks/top-categories.json';

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [withMap, setWithMap] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);

  const updateRecentSearch = (searchTerm) => {
    setRecentSearch([...recentSearch, { id: Date().now, title: searchTerm }]);
  };

  const onSearch = (term) => {
    if (term) {
      navigation.navigate(ScreenKey.SearchResultScreen,
        {
          screenDetail: ScreenKey.SearchCourseDetailScreen,
          keyword: term,
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
      />
      <View style={styles.shadow}>
        {
          (recentSearch.length > 0) &&
          <>
            <View style={styles.recentBar}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }} >Recent searches</Text>
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
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Top categories</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
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

