import { FlatList, StyleSheet, View, ActivityIndicator, Platform, Pressable, Modal, Text, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Card from './Card'
import { getAllItems } from '../../redux/slices/itemSlice';
import Filter from "./Filter";
import { useSelector, useDispatch } from "react-redux";
import { setPageValue } from "../../redux/slices/itemSlice";

const Items = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);
  const isLoading = useSelector(state => state.items.loading);
  const [col, setCol] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [lowerPrice, setLowerPrice] = useState("");
  const [upperPrice, setUpperPrice] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState(false);
  const [rmFilters, setRmFilters] = useState(false);

  const totalPages = useSelector(state => state.items.totalPages);
  const currentPage = useSelector(state => state.items.page);

  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(0, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <Pressable
          key={i}
          onPress={() => handlePageClick(i)}
          style={[
            styles.paginationButton,
            i === currentPage ? styles.activeButton : null,
          ]}>
          <Text style={{ color: 'white' }}>{i}</Text>
        </Pressable>,
      );
    }

    return buttons;
  };

  const handlePageClick = (i) => {
    dispatch(setPageValue(i));
  }


  useEffect(() => {
    dispatch(getAllItems({ "searchTerm": searchTerm, "categoryId": categoryId, "lowerPrice": lowerPrice, "upperPrice": upperPrice, "location": location }));
  }, [currentPage, searchTerm, filter])

  useEffect(() => {
    if (categoryId != "" || upperPrice != "" || lowerPrice != "" || location != "") {
      setRmFilters(true);
    }
    else { setRmFilters(false); }
  }, [filter])


  const goToDetails = ({ item }) => {
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
    dispatch(setPageValue(0));
    setModalVisible(false);
  }

  const searchItems = (text) => {
    setSearchTerm(text);
    dispatch(setPageValue(0));
  }

  const doFilter = () => {
    setFilter(!filter);
    dispatch(setPageValue(0));
    setModalVisible(false);
  }

  useEffect(() => {
    Platform.OS === 'android' ? setCol(1) : setCol(3);
  }, [Platform.OS])

  const goToMyOffers = () => {
    navigation.navigate('Offers')
  }

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <TextInput style={styles.inputSearch} inputMode="search" placeholder="Pretraga..." placeholderTextColor={'#fff'} onChangeText={(val) => searchItems(val)} />
        <View style={styles.optionsContainer}>
          <Pressable style={{ marginRight: 30 }} onPress={goToMyOffers}>
            <Image style={styles.image} source={{ uri: "http://192.168.0.182:8080/uploads/assets/baseline_list_white_24dp.png" }} />
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image style={styles.image} source={{ uri: "http://192.168.0.182:8080/uploads/assets/baseline_filter_list_white_24dp.png" }} />
          </Pressable>
        </View>
      </View>

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
              renderItem={({ item }) => {
                return (
                  <Card title={item.title} price={item.price}
                    image={item.image} description={item.description} location={item.location}
                    details={() => goToDetails({ item })} />
                )
              }}></FlatList>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
              {renderPaginationButtons()}
            </View>

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
  container: {
    paddingHorizontal: 24,
    height: 50,
    backgroundColor: '#0e4a38',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputSearch: {
    height: 40,
    borderColor: '#919191',
    borderWidth: 1,
    margin: 10,
    marginLeft: 0,
    paddingLeft: 15,
    borderRadius: 10,
    width: 250,
    color: '#fff',
    marginBottom: 20,
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
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#0e4a38',
  },
  activeButton: {
    backgroundColor: '#22c55d',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})

export default Items;