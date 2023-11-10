import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";

const Card=({title, price, image, details} )=>{
    return(
        <View style={styles.cardContainer}> 
                <View style={styles.card}> 
                  <View style={styles.header}> 
                      <Text style={styles.title}> 
                          {title}
                      </Text> 
                  </View>  
                  <View style={styles.content}> 
                        
                       <Image style={styles.img} source={require(`../images/${image}`)} />
                      <View style={styles.details}>
                          <Text>{price}KM</Text>
                          <Pressable style={styles.btn} onPress={details}>
                            <Text style={styles.btnText}>Detalji</Text>
                          </Pressable>
                      </View>
                  </View> 
              </View> 
             </View>
    )
}

const styles = StyleSheet.create({ 
    cardContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f5f5f5', 
        padding:5
    },
    card: { 
        backgroundColor: 'white', 
        borderRadius: 15, 
        padding: 16,  
        width: 350, 
        height: 350, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    header: { 
        marginBottom: 16, 
        alignItems: 'center', 
    }, 
    title: { 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'green', 
    }, 
    content: { 
        flex:1,
        alignItems: 'center', 
    }, 
    img:{
        width:200,
        height:200
    },
    details:{
        width:'100%',
        padding: 5,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    btn:{
        width:80,
        backgroundColor:'#0e4a38',
        height:30,
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        color: '#fff',
        fontSize:16
    }
}); 

export default Card;