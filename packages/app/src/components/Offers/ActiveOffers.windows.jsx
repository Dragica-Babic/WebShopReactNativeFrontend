import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActiveOffers, setActivePage } from "../../redux/slices/itemSlice";
import AddItem from "./AddItem";
import ActiveOffer from "./ActiveOffer";
import { Popup } from 'react-native-windows';
import Header from "../global/Header";

const ActiveOffers = ({ navigation }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.activeOffers);
    const loading = useSelector(state => state.items.loading);
    const userId = useSelector(state => state.users.user.id);
    const [modalVisible, setModalVisible] = useState(false);
    const totalPages = useSelector(state => state.items.activeTotal);
    const currentPage = useSelector(state => state.items.activeOffersPage);

    useEffect(() => {
        dispatch(getActiveOffers({ userId }));
    }, [currentPage])

    const onCancel = () => {
        setModalVisible(false);
    }

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
        dispatch(setActivePage(i));
    }

    const goToFinishedOffers = () => {
        navigation.navigate('FinishedOffers');
    }

    const goToHistory = () => {
        navigation.navigate('History');
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.navBar}>
                <Pressable>
                    <Text style={{ color: '#0e4a38', fontWeight: 'bold', textDecorationLine: 'underline' }}>AKTIVNE PONUDE</Text>
                </Pressable>
                <Pressable onPress={goToFinishedOffers}>
                    <Text>PRODATE PONUDE</Text>
                </Pressable>
                <Pressable onPress={goToHistory}>
                    <Text>KUPLJENE PONUDE</Text>
                </Pressable>
            </View>
            <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
            <Pressable onPress={() => setModalVisible(true)} style={styles.btn} >
                <Text style={styles.btnText}>+Dodaj ponudu</Text>
            </Pressable>

            <Popup isOpen={modalVisible}>
                <AddItem modalTitle={"Dodavanje ponude"} onCancel={onCancel} editMode={false} />
            </Popup>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <FlatList data={items}
                        showsHorizontalScrollIndicator={false}
                        numColumns={1}
                        ItemSeparatorComponent={() => (
                            <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                        )}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => {
                            return (
                                <ActiveOffer item={item} />
                            )
                        }}>
                    </FlatList>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                        {renderPaginationButtons()}
                    </View>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',

    },
    btn: {
        width: 200,
        backgroundColor: '#0e4a38',
        height: 30,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    btnText: {
        color: '#fff',
        fontSize: 16
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
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        marginLeft: 20,
        marginRight: 20
    }
})

export default ActiveOffers;