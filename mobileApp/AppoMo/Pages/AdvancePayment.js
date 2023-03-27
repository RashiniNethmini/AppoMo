import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,

    TouchableOpacity,
} from "react-native";


function AdvPayment() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment of Advance</Text>
            <View style={{ flexDirection: 'row', justifyContent:'space-between',margin:50,backgroundColor:'yellow'}}>
                <Text >Amount</Text>
                
                <Text>
                    Rs.300
                </Text>
            </View>



        </View>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",


    },

    title: {
        paddingTop: 180,
        fontSize: 30,
        color: '#fff',


    },
});
export default AdvPayment;


