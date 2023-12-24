import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActiveOffers, setActivePage } from "../../redux/slices/itemSlice";
import AddItem from "./AddItem";
import ActiveOffer from "./ActiveOffer";
import ModalComponent from "../global/ModalComponent";

const ActiveOffers = () => {
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
        dispatch(setActivePage(i));
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setModalVisible(true)} style={styles.btn} >
                <Text style={styles.btnText}>+Dodaj ponudu</Text>
            </Pressable>

            <ModalComponent visible={modalVisible} component={()=><AddItem modalTitle={"Dodavanje ponude"} onCancel={onCancel} editMode={false} />}/>
                
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
        backgroundColor: '#0e4a38',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
})

export default ActiveOffers;