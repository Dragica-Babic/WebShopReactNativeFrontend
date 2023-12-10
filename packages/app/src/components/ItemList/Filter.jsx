import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Text, Platform } from "react-native";
import CategoryService from "../../services/Category.service";
import { Picker } from "@react-native-picker/picker";

const Filter = ({ removeFilters, setCategoryId, categoryId, setLowerPrice, setUpperPrice, setLocation, setFilter }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getCategories({ setCategories });
    }, [])

    const renderCategories = () => {
        return categories.map((category) => {
            return <Picker.Item label={category.title} value={category.id} key={category.id} />
        })
    }

    const setCategory = (value) => {
        if (value != '0') {
            setCategoryId(value);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Filtriranje</Text>
            </View>
            <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
            <View style={{ marginTop: 20 }}>
                <Text style={styles.text}>Kategorija</Text>
                <Picker selectedValue={categoryId}
                    style={{ height: 40, width: 200, color: 'black' }}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => {
                        setCategory(itemValue);
                    }}>
                    <Picker.Item label="Odaberi kategoriju" value='0' key='0' />
                    {renderCategories()}
                </Picker>
            </View>
            <View style={{ marginTop: Platform.OS === 'windows' ? 20 : 10 }}>
                <Text style={styles.text}>Cijena</Text>
                <View style={styles.row}>
                    <TextInput placeholder="Od" style={styles.input} keyboardType="numeric" onChangeText={(val) => setLowerPrice(val)} />
                    <TextInput placeholder="Do" style={styles.input} keyboardType="numeric" onChangeText={(val) => setUpperPrice(val)} />
                </View>
            </View>
            <View style={{ marginTop: Platform.OS === 'windows' ? 60 : 10 }}>
                <Text style={styles.text}>Lokacija</Text>
                <TextInput onChangeText={(val) => setLocation(val)} style={styles.input} />
            </View>
            <View style={{ backgroundColor: "green", height: 2, margin: 2, marginTop: Platform.OS === 'windows' ? 40 : 20 }} />
            <View style={styles.row}>
                <Pressable style={styles.btn} onPress={setFilter}>
                    <Text style={styles.btnText}>Filtriraj</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={removeFilters}>
                    <Text style={styles.btnText}>Otkaži</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        margin: 'auto',
        padding: 30,
        width: 400,
        height: Platform.OS === 'windows' ? 500 : 450,

    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: '#0e4a38'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        marginTop: 5
    },
    input: {
        height: 40,
        width: 150,
        margin: 8,
        borderWidth: 1
    },
    btn: {
        width: 150,
        backgroundColor: '#0e4a38',
        height: 30,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    text: {
        fontSize: 16
    }

})

export default Filter;