import { ImageBackground, Pressable, StyleSheet, Text, View, } from "react-native"
import {logout} from '../redux/slices/userSlice';
import { useDispatch } from "react-redux";

const Header=()=>{
    const dispatch=useDispatch();
    return(
        <View style={styles.header}>
            <Text style={styles.text}>Web Shop</Text>
            <Pressable onPress={()=>dispatch(logout())}>
                <ImageBackground source={require('../assets/baseline_logout_white_24dp.png')}
                resizeMode="cover" style={styles.image} />
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        height: 80,
        backgroundColor: '#0e4a38',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    text: {
        fontSize: 40,
        color: '#fff'
    },
    image: {
        width:30,
        height:30
      },
})

export default Header;