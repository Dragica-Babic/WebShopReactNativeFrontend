import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

const Menu=({navigation, searchItems, setModalVisible})=>{

    const goToMyOffers=()=>{
        navigation.navigate('Offers')
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.input} inputMode="search" placeholder="Pretraga..." onChangeText={(val)=>searchItems(val)}/>
            <View style={styles.optionsContainer}>
                <Pressable style={{marginRight:30}} onPress={goToMyOffers}>
                    <Image style={styles.image} source={require("../assets/baseline_list_white_24dp.png")} />
                </Pressable>
                <Pressable onPress={()=>setModalVisible(true)}>
                    <Image style={styles.image} source={require("../assets/baseline_filter_list_white_24dp.png")} />
                </Pressable>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        paddingHorizontal: 24,
    height: 50,
    backgroundColor: '#0e4a38',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
    },
    optionsContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    image:{
        width:30,
        height:30
    }, 
    input:{
        height: 50,
        borderColor: '#919191',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 15,
        borderRadius: 10,
        width: 250,
        color: '#fff',
        marginBottom: 20,
    }
})

export default Menu;