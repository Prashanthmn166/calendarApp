import React from 'react';
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const CalendarHeader = (props) =>{
    var NativeMonthDetails = ["जनवरी", "फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अकतूबर","नवंबर","दिसम्बर"];
    var MonthDetails = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    return (
        <View style={styles.calendarHeaderContainer}>
            <View style={styles.calendarHeader}>
                <View style={styles.monthHeaderContainer}>
                    <Text style={styles.monthHeaderInNataiveLanguage}>{NativeMonthDetails[props.currentMonth]}</Text>
                    <Text style={styles.monthHeaderInDefaultLanguage}>{MonthDetails[props.currentMonth]} 2020</Text>
                </View>
                <View style={styles.carouselContainer}>
                    <Text>Monthly highlights @ Ads</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    calendarHeaderContainer:{
        height: "22%",
        paddingRight: 2,
        paddingLeft: 3,
        paddingBottom: 0,
    },
    calendarHeader:{
        backgroundColor:'#FFFFFF',
        borderWidth: 0.5,
        borderColor:"#FFFFFF",
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        alignItems:"center",
        padding:0,
        flex:1
    },
    monthHeaderContainer:{
        height: "33%",
        alignItems: "center",
        margin:0,
        padding:0,
    },
    monthHeaderSubTitle:{
        color: Colors.nativeTextColor,
    },
    monthHeaderInNataiveLanguage:{
        fontSize: 20,
        fontWeight:"bold",
        color: Colors.nativeTextColor,
        opacity: 0.9,
        margin:0,
        padding:0,
    },
    monthHeaderInDefaultLanguage:{
        fontSize:16,
        margin:0,
        padding:0,
        lineHeight: 16
    },
    carouselContainer:{
        backgroundColor: Colors.corosalBackgroundColor,
        borderRadius: 11,
        width:"96.91%",
        height: "63%",
        borderColor:2,
        opacity:0.8,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default CalendarHeader;