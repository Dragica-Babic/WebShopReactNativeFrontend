import {View, Text, StyleSheet} from 'react-native';
import Registration from '@web-shop/app/src/components/StartPage/Registration';

const RegistrationPage=()=>{
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Web Shop</Text>
            </View>
            <Registration/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    header: {
        paddingHorizontal: 24,
        height: 80,
        backgroundColor: '#0e4a38',
        justifyContent:'space-between'
    },
    text: {
        paddingTop:14,
        fontSize: 40,
        color: '#fff'
    },
})

export default RegistrationPage;