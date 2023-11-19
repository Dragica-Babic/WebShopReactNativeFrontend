import { FlatList, StyleSheet, View, ActivityIndicator, Platform, TextInput, Pressable, Image, Modal, Text } from "react-native";
import { useState, useEffect } from "react";
import Card from './Card'
import ItemService from '../services/ItemService.service'
import Filter from "./Filter";
import Menu from "./Menu";

const Items = ({ navigation }) => {
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [col, setCol] = useState(1);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [lowerPrice, setLowerPrice] = useState("");
  const [upperPrice, setUpperPrice] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState(false);
  const [rmFilters, setRmFilters] = useState(false);

  useEffect(() => {
    ItemService.getItems({ setLoading, page, searchTerm, categoryId, lowerPrice, upperPrice, location })
      .then((res) => {
        setItems([...items, ...res.content]);
        if (res.numberOfElements < 12) {
          setHasMoreToLoad(false);
        }
      })
  }, [page, searchTerm, filter]);

  useEffect(() => {
    if (categoryId != "" || upperPrice != "" || lowerPrice != "" || location != "") {
      setRmFilters(true);
    }
    else { setRmFilters(false); }
  }, [filter])


  const goToDetails = ({ item }) => {
    console.log(item.id)
    navigation.navigate('Details', {
      id: item.id
    })
  }

  const removeFilters = () => {
    setCategoryId("");
    setUpperPrice("");
    setLowerPrice("");
    setLocation("");
    setFilter(!filter);
    setItems([]);
    setModalVisible(false);
  }

  const searchItems = (text) => {
    setItems([]);
    setSearchTerm(text);
    setPage(0);
  }

  const goToMyOffers = () => {
    navigation.navigate('Offers')
  }

  const doFilter = () => {
    setItems([]);
    setFilter(!filter);
    setPage(0);
    setModalVisible(false);
  }

  useEffect(() => {
    Platform.OS === 'android' ? setCol(1) : setCol(3);
  }, [Platform.OS])

  const showLoader = () => {
    return (

      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : null
        }
      </View>

    )
  }

  const loadMoreItems = () => {
    setPage(page + 1);
  }


  return (
    <View style={styles.content}>
      <Menu navigation={navigation} searchItems={searchItems} setModalVisible={setModalVisible} />
      <Modal transparent visible={modalVisible}>
        <Filter removeFilters={removeFilters} setCategoryId={setCategoryId} categoryId={categoryId}
          setLowerPrice={setLowerPrice} setUpperPrice={setUpperPrice} setLocation={setLocation}
          setFilter={doFilter} />
      </Modal>

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.content} >
            {rmFilters ? (
              <View>
                <Pressable style={styles.rmBtn} onPress={removeFilters}>
                  <Text>X Poništi filtere</Text>
                </Pressable>
              </View>
            ) : null
            }

            <FlatList data={items}
              showsHorizontalScrollIndicator={false}
              numColumns={col}
              key={col}
              keyExtractor={({ id }) => id}
              ListFooterComponent={showLoader}
              onEndReached={() => {
                if (hasMoreToLoad) {
                  loadMoreItems();
                }
              }}
              onEndReachedThreshold={0.5}
              renderItem={({ item }) => {
                return (
                  <Card title={item.title} price={item.price}
                    image={item.image} description={item.description} location={item.location}
                    details={() => goToDetails({ item })} />
                )
              }}></FlatList>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    flexDirection: "column"
  },
  image: {
    width: 30,
    height: 30
  },
  input: {
    height: 30,
    backgroundColor: '#fff'
  },
  rmBtn: {
    borderWidth: 1,
    borderColor: '#0e4a38',
    borderRadius: 10,
    width: 150,
    margin: 10,
    height: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Items;