import React, {Component, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Alert, Button} from 'react-native';
import Modal, { ModalContent } from 'react-native-modals';
import { Pages } from 'react-native-pages';
import Colors from '../constants/Colors';
import CalendarData from '../data/dateDetails';


class CalendarBody extends Component {
    state = {
        showModal:true
    }  ;
    constructor(props){
        super(props);
        this.dayNumbers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.daysDispOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.monthDetails=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        this.monthArr = [
            'Mon1', 'Tue1', 'Wed1', 'Thu1', 'Fri1', 'Sat1', 'Sun1',
            'Mon2', 'Tue2', 'Wed2', 'Thu2', 'Fri2', 'Sat2', 'Sun2',
            'Mon3', 'Tue3', 'Wed3', 'Thu3', 'Fri3', 'Sat3', 'Sun3',
            'Mon4', 'Tue4', 'Wed4', 'Thu4', 'Fri4', 'Sat4', 'Sun4',
            'Mon5', 'Tue5', 'Wed5', 'Thu5', 'Fri5', 'Sat5', 'Sun5'
           
        ];
        this.NativeLanguage = {
            Mon: 'सोम',
            Tue: 'मंगल',
            Wed: 'बुध',
            Thu: 'गुरु',
            Fri: 'शुक्र',
            Sat: 'शनि',
            Sun: 'रवि',
        };
        this.currentDate=new Date();
        this.currentYear=new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.genrateYearCalendar();    
       // this.showModal=true;
        
    }
    genrateYearCalendar() 
    {
        this.yearCalendarContent = new Array;
        //for (var month = 1; month <= 2; month++)
        for(var month=1; month<=12;month++)
        {
            var daysInMonth = new Date(this.currentYear, month, 0).getDate();
            var daysDetails = [];
            var finishedDaysArr = [];
            var tempMonthArr=[];
            var tempMonthArr = [
                'Mon1', 'Tue1', 'Wed1', 'Thu1', 'Fri1', 'Sat1', 'Sun1',
                'Mon2', 'Tue2', 'Wed2', 'Thu2', 'Fri2', 'Sat2', 'Sun2',
                'Mon3', 'Tue3', 'Wed3', 'Thu3', 'Fri3', 'Sat3', 'Sun3',
                'Mon4', 'Tue4', 'Wed4', 'Thu4', 'Fri4', 'Sat4', 'Sun4',
                'Mon5', 'Tue5', 'Wed5', 'Thu5', 'Fri5', 'Sat5', 'Sun5'

            ];
            for (var i = 1; i <= daysInMonth; i++) 
            {
                daysDetails[i] = { fullDate: '', day: '', date: '' ,type:'date'};
                daysDetails[i].fullDate = new Date(this.currentYear, month-1, i);
                daysDetails[i].date = new Date(this.currentYear, month-1, i).getDate();
                var day = daysDetails[i].fullDate.getDay();
                for (var j = 0; j < tempMonthArr.length; j++) 
                {
                    if (tempMonthArr[j]!=undefined)
                    {
                        var tempFullDay = tempMonthArr[j];
                        var tempDay = tempFullDay.substring(0, 3);
                        if (this.dayNumbers[day] == tempDay && finishedDaysArr.indexOf(tempMonthArr[j]) == -1) 
                        {
                            daysDetails[i].day = tempMonthArr[j];
                            finishedDaysArr.push(tempMonthArr[j]);
                            break;
                        }
                        else {
                            var tempMonthdate = tempMonthArr[j];
                            delete tempMonthArr[j];
                            tempMonthArr.push(tempMonthdate);
                        }
                    }
                }
                
                var dispDateDetails = [];
                for (var k = 0; k < this.daysDispOrder.length; k++) 
                {
                    var tempDispDay = this.daysDispOrder[k];
                    dispDateDetails[k] = [];
                    var pushDefaultDay = "Y";
                    for (var l = 1; l <= 6; l++) 
                    {
                        if (pushDefaultDay == "Y") 
                        {
                            dispDateDetails[k].push({ date: 'type', day: this.daysDispOrder[k] });
                            pushDefaultDay = "N";
                        }
                        var gotDay = 'N';
                        for (var d = 0; d < daysDetails.length; d++) 
                        {
                            if (daysDetails[d] && daysDetails[d].day == (tempDispDay + l)) {
                                dispDateDetails[k].push(daysDetails[d]);
                                gotDay = "Y";
                            }
                        }
                        if (gotDay == "N")
                            dispDateDetails[k].push({ date: '', day: '' });
                    }
                }
            }
            finishedDaysArr=[];
            var dispDateDetails = [];
            var col=4;
            daysDetails.forEach(element => {
                if (element.day.substr(3, 1) > col)
                    col = element.day.substr(3, 1);
            });
            for (var k = 0; k < this.daysDispOrder.length; k++) 
            {
                var tempDispDay = this.daysDispOrder[k];
                dispDateDetails[k] = [];
                var pushDefaultDay = "Y";
                for (var l = 1; l <= col; l++) 
                {
                    if (pushDefaultDay == "Y") {
                        dispDateDetails[k].push({ date: '', day: this.daysDispOrder[k], type: 'dow', fullDate: '' });
                        pushDefaultDay = "N";
                    }
                    var gotDay = 'N';
                    for (var d = 0; d < daysDetails.length; d++) {
                        if (daysDetails[d] && daysDetails[d].day == (tempDispDay + l)) {
                            dispDateDetails[k].push(daysDetails[d]);
                            gotDay = "Y";
                        }
                    }
                    if (gotDay == "N")
                        dispDateDetails[k].push({ date: '', day: '',type:'empty',fullDate:'' });
                }
            }
            this.yearCalendarContent[month]=[];
            this.yearCalendarContent[month]=this.createMonthCalender(dispDateDetails);
        }
    }
    createMonthCalender(dispDateDetails)
    {   
        this.MonthPageDetails = dispDateDetails.toString();
        this.tempContent=new Array;
        dispDateDetails.map((rowItem) => 
        { 
            this.tempContent['day'];
            var temDay = rowItem[0]['day'];
            this.tempContent[temDay]=[];
            this.tempContent[temDay]=rowItem.map((colItems)=>
            {
                if (colItems.type=="dow")
                {
                    
                    return (<View style={{ ...styles.col, ...styles.dateBuilder,...styles.dowContainer}}>
                                <Text style={styles.dowNativeLan }>{this.NativeLanguage[colItems.day]}</Text>
                                <Text style={styles.dowDefaultLan}>{colItems.day.toUpperCase()}</Text>
                            </View>);
                }
                else
                {
                    var Month = this.monthDetails[new Date(colItems.fullDate).getMonth()];
                    if (colItems.type=='empty')
                        return (<View style={{ ...styles.col }}><Text>{colItems.date}</Text><Text>{Month}</Text></View>);
                    else
                    {
                        return (<View style={{ ...styles.col, ...styles.dateBuilder }} >
                                    <TouchableHighlight onPress={this.getDateDetails.bind(this, colItems.fullDate)}>
                                        <View>
                                            <Text style={styles.customDate} >{colItems.date}</Text>
                                            <View style={styles.dateImage}>
                                                <Image source={require('../assets/flag.png')} />
                                            </View>
                                        </View>
                                    </TouchableHighlight>   
                                </View>);
                    }
                        
                }
                    
            })
        });
        this.content=(
        <View style={styles.monthCalendar}>   
            <View style={styles.row}>{this.tempContent[this.daysDispOrder[0]]}</View>
            <View style={styles.row}>{this.tempContent[this.daysDispOrder[1]]}</View>   
            <View style={styles.row}>{this.tempContent[this.daysDispOrder[2]]}</View>
            <View style={styles.row}>{this.tempContent[this.daysDispOrder[3]]}</View>
            <View style={styles.row}>{this.tempContent[this.daysDispOrder[4]]}</View>
            <View style={styles.row}>{this.tempContent[this.daysDispOrder[5]]}</View>
            <View style={styles.row}>{this.tempContent[this.daysDispOrder[6]]}</View>
        </View>
        )
        return this.content;
    }
    getDateDetails(d){
        console.log(this.state.showModal);
    }
    render(){
        return (
            <View style={styles.bodyContainer}>
                 <Pages horizontal={false} indicatorPosition="none" startPage={this.currentMonth} onScrollEnd={this.props.parentCallback}>
                    {this.yearCalendarContent[1]}
                    {this.yearCalendarContent[2]}
                    {this.yearCalendarContent[3]}
                    {this.yearCalendarContent[4]}
                    {this.yearCalendarContent[5]}
                    {this.yearCalendarContent[6]}
                    {this.yearCalendarContent[7]}
                    {this.yearCalendarContent[8]}
                    {this.yearCalendarContent[9]}
                    {this.yearCalendarContent[10]}
                    {this.yearCalendarContent[11]}
                    {this.yearCalendarContent[12]}
                </Pages> 
                <Modal
                    visible={this.state.showModal}
                    onTouchOutside={() => {
                        const { showModal } = this.state;  
                        console.log("console log outside");
                        console.log(this.state.showModal);
                        this.setState({ showModal:false});
                        console.log(this.state.showModal);
                    }}
                >
                    <ModalContent>
                        <View><Text>Hero i am</Text></View>
                        <Button title="submit" onPress={() => { this.setState({ showModal: false })}}/>
                    </ModalContent>
                </Modal>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    bodyContainer:{
        flex:1
    },
    row:{
        flex:1,
        flexDirection:"row",
    },
    col:{
        flex:1
    },
    monthCalendar:{
        flex:1,
    },
    pageDesing:{
        backgroundColor: "pink",
        padding:0,
        flex:1
    },
    dateBuilder:{
        backgroundColor:"#FFFFFF",
        borderWidth:0.25,
        borderColor:"#707070",
        borderRadius:8,
        margin:2,   
    },
    customDate:{
        color:Colors.nativeTextColor,
        fontSize:20,
        fontWeight:"bold",
        paddingTop:3,
        paddingLeft:7
    },
    dowDefaultLan:{
        fontWeight:"bold",
        fontSize:12,
        opacity:0.7
    },
    dowNativeLan:{
        color: Colors.nativeTextColor,
        fontWeight:"bold",
        fontSize:16,
        opacity: 0.8
    },
    dowContainer:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        opacity:0.6
    },
    dateImage:{
        alignItems:"flex-end",
        justifyContent:"flex-end"
    }
})
export default CalendarBody;
