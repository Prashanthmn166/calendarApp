import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CalendarHeader from '../components/CalendarHeader';
import CalendarBody from "../components/CalendarBody";

const MainCalendarScreen=(props)=>{
    const [currentDispMonth, updateCurrentDispMonth] = useState(1)
    function changeMonth(params) {
        updateCurrentDispMonth(params);
    }
    return (
        <View style={styles.mainCalendarScreen}>
            <CalendarHeader currentMonth={currentDispMonth}></CalendarHeader>
            <CalendarBody parentCallback={changeMonth}></CalendarBody>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCalendarScreen:{
        flex:1
    }
});

export default MainCalendarScreen;