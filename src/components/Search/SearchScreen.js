import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RowItem from '../Common/RowItem';
import SearchBar from './SearchBar';
import Colors from '../../constants/Colors';

const SearchScreen = ({ navigation }) => {
  const recentList = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'React native',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Amazon web service',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Javascript',
    },
  ];

  const categories = [
    {
      id: '1',
      icon: 'bookmark-outline',
      title: 'Most bookmarked'
    },
    {
      id: '2',
      icon: 'eye-outline',
      title: 'Most viewd'
    },
    {
      id: '3',
      icon: 'heart-outline',
      title: 'Most loved'
    },
    {
      id: '4',
      icon: 'star-outline',
      title: 'Most stars'
    },
  ]

  const renderItem = ({ title }) => {
    return (
      <RowItem
        icon="replay"
        title={title}
        rightIcon={false}
        onPress={() => {
          navigation.navigate('SearchResult',
            { keyword: title })
        }}
      />
    );
  };


  const renderCategories = ({ id, icon, title }) => {
    return (
      <RowItem
        icon={icon}
        title={title}
        rightIcon={true}
        onPress={() => {
          navigation.navigate('SearchResult',
            { keyword: title })
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <View style={styles.shadow}>
        <View style={styles.recentBar}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }} >Recent searches</Text>
          <Text style={{ color: Colors.tintColor }}>CLEAR ALL</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={recentList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderItem(item)}
        />

        <View style={styles.recentBar}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Top categories</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderCategories(item)}
        />

      </View>

    </SafeAreaView>
  )
}

export default SearchScreen

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
