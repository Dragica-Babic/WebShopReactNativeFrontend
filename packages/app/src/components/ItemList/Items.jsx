import { FlatList, StyleSheet, View, ActivityIndicator, Dimensions, Pressable, Text, TextInput, Image, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import Card from './Card'
import { getAllItems } from '../../redux/slices/itemSlice';
import Filter from "./Filter";
import { useSelector, useDispatch } from "react-redux";
import { setPageValue } from "../../redux/slices/itemSlice";
import { useIsFocused } from '@react-navigation/native';
import url from '../../environment/config.json';
import ModalComponent from "../global/ModalComponent";
import Header from '../global/Header';

const Items = ({ navigation }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);
    const isLoading = useSelector(state => state.items.loading);
    const [col, setCol] = useState(3);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [lowerPrice, setLowerPrice] = useState("");
    const [upperPrice, setUpperPrice] = useState("");
    const [location, setLocation] = useState("");
    const [filter, setFilter] = useState(false);
    const [rmFilters, setRmFilters] = useState(false);
    const isFocused = useIsFocused();

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
        if (startPage !== endPage - 1) {
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
        }
        return buttons;
    };

    const handlePageClick = (i) => {
        dispatch(setPageValue(i));
    }


    useEffect(() => {
        dispatch(getAllItems({ "searchTerm": searchTerm, "categoryId": categoryId, "lowerPrice": lowerPrice, "upperPrice": upperPrice, "location": location }));
    }, [currentPage, searchTerm, filter, isFocused])
    

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
        Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                if (window.width > 850) {
                    setCol(3);
                    console.log(window.width);
                }
                else if (window.width < 850 && window.width > 650) {
                    setCol(2);
                }
                else {
                    setCol(1);
                }
            },
        );
        if(Platform.OS==='android'){
            setCol(1);
        }
    }, [Platform])

    const goToMyOffers = () => {
        navigation.navigate('Offers')
    }

    return (
        <View style={styles.content}>
            {
                Platform.OS==='windows'?(<Header navigation={navigation} />):null
            }
            <View style={styles.container}>
                <TextInput style={styles.inputSearch} inputMode="search" placeholder="Pretraga..." placeholderTextColor={'#fff'} onChangeText={(val) => searchItems(val)} />
                <View style={styles.optionsContainer}>
                    <Pressable style={{ marginRight: 30 }} onPress={goToMyOffers}>
                        <Image style={styles.image} source={{ uri: `${url.url}/uploads/assets/baseline_list_white_24dp.png` }} />
                    </Pressable>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <Image style={styles.image} source={{ uri: `${url.url}/uploads/assets/baseline_filter_list_white_24dp.png` }} />
                    </Pressable>
                </View>
            </View>

            <ModalComponent visible={modalVisible} component={()=><Filter removeFilters={removeFilters} setCategoryId={setCategoryId} categoryId={categoryId}
                    setLowerPrice={setLowerPrice} setUpperPrice={setUpperPrice} setLocation={setLocation}
                    setFilter={doFilter} />} />

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
    header: {
        paddingHorizontal: 24,
        height: 80,
        backgroundColor: '#0e4a38',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
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
        backgroundColor: '#0e4a38',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        fontSize: 40,
        color: '#fff'
    },
})

export default Items;