import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <View style={styles.shadow}>
        <View style={styles.recentBar}>
          <Text>Recent searches</Text>
          <Text style={{ color: Colors.tintColor }}>CLEAR ALL</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recentList}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}
              onPress={() => {
                navigation.navigate('SearchResult',
                  { keyword: item.title })
              }}
            >
              <MaterialIcons name="replay" size={22} />
              <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{item.title}</Text>
            </TouchableOpacity>
          }
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
