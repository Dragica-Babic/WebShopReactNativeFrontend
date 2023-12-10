import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, StyleSheet, View, ActivityIndicator, Pressable, Text } from "react-native";
import { getFinishedOffers, setFinishedPage } from "../../redux/slices/itemSlice";
import FinishedOffer from "./FinishedOffer";
import Header from '../global/Header';

const FinishedOffers = ({ navigation }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.finishedOffers);
    const loading = useSelector(state => state.items.loading);
    const userId = useSelector(state => state.users.user.id);

    const totalPages = useSelector(state => state.items.finishedTotal);
    const currentPage = useSelector(state => state.items.finishedOffersPage);

    useEffect(() => {
        dispatch(getFinishedOffers({ userId }));
    }, [currentPage, dispatch])

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
        dispatch(setFinishedPage(i));
    }

    const goToActiveOffers = () => {
        navigation.navigate('ActiveOffers');
    }

    const goToHistory = () => {
        navigation.navigate('History');
    }

    return (
        <View>
            <Header navigation={navigation} />
            <View style={styles.navBar}>
                <Pressable onPress={goToActiveOffers}>
                    <Text>AKTIVNE PONUDE</Text>
                </Pressable>
                <Pressable >
                    <Text style={{ color: '#0e4a38', fontWeight: 'bold', textDecorationLine: 'underline' }} >PRODATE PONUDE</Text>
                </Pressable>
                <Pressable onPress={goToHistory}>
                    <Text>KUPLJENE PONUDE</Text>
                </Pressable>
            </View>
            <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
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
                                <FinishedOffer item={item} />
                            )
                        }}></FlatList>
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
        flex: 1,
        flexWrap: 'wrap'

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

export default FinishedOffers;