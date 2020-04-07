import React, {Component, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Modal, { ModalContent } from 'react-native-modals';
import { Pages } from 'react-native-pages';
import Colors from '../constants/Colors';
import CalendarData from '../data/dateDetails';


class CalendarBody extends Component {
    state = {
        showModal:false,
        calendarDetails:{}
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
    getDateDetails(selectedDate){
        this.setState({ showModal: true });
        var date = new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate()));
        var dateStr = ("0" + (date.getDate())).slice(-2) + '-' + (("0" + (date.getMonth() + 1))).slice(-2)+'-'+date.getFullYear();
        this.setState({ calendarDetails: CalendarData[dateStr] });
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
                    onTouchOutside={() => { this.setState({ showModal:false});}}
                >
                    <ModalContent style={styles.popupContainer}>
                        <View >
                            <Text style={styles.PopupMonthHeading}>{this.state.calendarDetails['MONTH']}</Text>
                        </View>
                        <View style={styles.popupMainDetails}>
                            <View style={styles.popupDateDetails}>
                                <View >
                                    <Text style={styles.popupDisplayDate}>{this.state.calendarDetails['DATE']}</Text>
                                </View>
                                <View >
                                    <Text style={styles.popupWeekDay} >{this.state.calendarDetails['DAYINHINDI']}</Text>
                                </View>
                                <View>
                                    <Text style={styles.popupEvent1Name}>{this.state.calendarDetails['EVENT1']}</Text>
                                </View>
                                <View>
                                    <Text style={styles.popupEvent2Name}>{this.state.calendarDetails['EVENT2']}</Text>
                                </View>
                                <View>
                                    <Text style={styles.popupEvent3Name}>{this.state.calendarDetails['EVENT3']}</Text>
                                </View>
                            </View>
                            <View style={styles.popupImage}>
                                <Image source={require('../assets/REPUBLICDAY.png')} style={{ width: 100, height: 100 }}/>
                            </View>                            
                        </View>  
                        <View style={styles.popuppopupDayHeadingContainer}>
                            <Text style={styles.popupDayHeading}>{this.state.calendarDetails['DAYHEADING']}</Text>
                        </View>
                        <View style={styles.popupSunContainer}>
                            <View style={styles.popupSunriseContainer}>
                                <Image source={require('../assets/sunrise.png')} style={{ width: 20, height: 20 }}/>
                                <Text>{this.state.calendarDetails['SUNRISE']}</Text>
                            </View>
                            <View style={styles.popupSunsetContainer}>
                                <Image source={require('../assets/sunrise.png')} style={{ width: 20, height: 20 }} />
                                <Text>{this.state.calendarDetails['SUNSET']}</Text>
                            </View>
                            <View style={styles.popupRashiContainer}>
                                <Image source={require('../assets/sunrise.png')} style={{ width: 20, height: 20 }} />
                                <Text>{this.state.calendarDetails['MOONSIGN']}</Text>
                            </View>
                        </View>
                        <View style={styles.popupKalaContainer}>
                            <View style={styles.popupRahukalaContainer}>
                                <Text style={styles.popupKalaName}>राहु काल</Text>
                                <Text style={styles.popupKalaDetails}>{this.state.calendarDetails['RAHUKALA']}</Text>
                            </View>
                            <View style={styles.popupGuliContainer}>
                                <Text style={styles.popupKalaName}>गुलि काला</Text>
                                <Text style={styles.popupKalaDetails}>{this.state.calendarDetails['GULIKALA']}</Text>
                            </View>
                            <View style={styles.popupYamakalaContainer}>
                                <Text style={styles.popupKalaName}>यमगंधा कला</Text>
                                <Text style={styles.popupKalaDetails}>{this.state.calendarDetails['YAMAGANDAKALA']}</Text>
                            </View>
                        </View>
                        <View style={styles.popupBottomDetailsContainer}>
                            <View style={styles.popupTithiContainer}>
                                <Text style={styles.popupBottomDetailsName}>तिथि</Text>
                                <Text style={styles.popupBottomDetailsDesc}>{this.state.calendarDetails['TITHI']}</Text>
                            </View>
                            <View style={styles.popupNakshatraContainer}>
                                <Text style={styles.popupBottomDetailsName}>नक्षत्र</Text>
                                <Text style={styles.popupBottomDetailsDesc}>{this.state.calendarDetails['NAKSHATAR']}</Text>
                            </View>
                            <View style={styles.popupYogaContainer}>
                                <Text style={styles.popupBottomDetailsName}>योग</Text> 
                                <Text style={styles.popupBottomDetailsDesc}>{this.state.calendarDetails['YOGA']}</Text>
                            </View>
                            <View style={styles.popupKarunaContainer}>
                                <Text style={styles.popupBottomDetailsName}>करुणा</Text>
                                <Text style={styles.popupBottomDetailsDesc}>{this.state.calendarDetails['KARANA']}</Text>
                            </View>
                        </View>
                        {/* <Button title="submit" onPress={() => { this.setState({ showModal: false })}}/> */}
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
    },
    popupContainer:{
        width:280,
    },
    PopupMonthHeading:{
        fontSize:24,
        color: Colors.nativeTextColor,
        textAlign: "center",
        paddingTop:0,
        fontWeight: "bold"
    },
    popupMainDetails:{
        flexDirection:"row",
       

    },
    popupDateDetails:{
        flex:1,
        
    },
    popupImage:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    popupDisplayDate:{
        color: "#FF3B3B",
        fontSize:34,
        fontWeight:"bold"
    }, 
    popupWeekDay:{
        color: "#FF3B3B"
    },
    popupEvent1Name:{
        color: "#FF3B3B",
        fontWeight: "bold"
    },
    popupEvent2Name: {
        color: Colors.nativeTextColor,
        fontWeight: "bold"
    },
    popupEvent3Name: {
        fontWeight: "bold"
    },
    popuppopupDayHeadingContainer:{
        paddingRight: 25,
        paddingLeft: 25
    },
    popupDayHeading:{
        color: Colors.nativeTextColor,
        fontSize:16,
        alignContent:"center",
        alignItems:"center"
    },
    popupSunContainer:{
        flexDirection:"row",
        paddingRight:3,
        paddingLeft:3,
        fontSize:14,
        alignContent:"center",
        paddingTop:10
    },
    popupSunriseContainer:{
        flex:1.5,
        paddingRight: 2,
        paddingLeft: 2,
        flexDirection:"row",
        justifyContent:"center"
    },
    popupSunsetContainer:{
        flex:1.5,
        paddingRight: 2,
        paddingLeft: 2,
        flexDirection: "row",
        justifyContent: "center"
    },
    popupRashiContainer:{
        flex:1,
        paddingRight: 2,
        paddingLeft: 2,
        flexDirection: "row",
        justifyContent: "center"
    },
    popupKalaContainer:{
        flexDirection:"column"
    },
    popupRahukalaContainer:{
        flexDirection: "row",
        paddingTop:10,
        paddingBottom:5
    },
    popupGuliContainer:{
        flexDirection: "row",
        paddingBottom: 5,
        paddingTop: 5,
    },
    popupYamakalaContainer:{
        flexDirection: "row",
        paddingBottom: 5,
        paddingTop: 5,
    },
    popupKalaName:{
        color:Colors.nativeTextColor,
        fontSize:16,
        flex:1
    },
    popupKalaDetails:{
        fontSize: 16,
        flex:2
    },
    popupBottomDetailsContainer:{
        flexDirection: "column",
        paddingTop:20
    },
    popupBottomDetailsName: {
        color:Colors.nativeTextColor,
        fontSize:16,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    popupBottomDetailsDesc: {
        fontSize: 16,
        flex: 2,
        
    },
    popupTithiContainer:{
        flexDirection: "row",
        
    },
    popupNakshatraContainer:{
        flexDirection: "row",
        
    },
    popupYogaContainer:{
        flexDirection: "row",
        
    },
    popupKarunaContainer:{
        flexDirection: "row",
      
    } 
})
export default CalendarBody;
