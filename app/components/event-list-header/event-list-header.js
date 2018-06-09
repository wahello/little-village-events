import React from "react";
import { StyleSheet, View, Text } from "react-native";

import moment from "moment";
import _isString from "lodash";

const styles = StyleSheet.create( {
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        height: 38,

        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        backgroundColor: "#F9F9F9",

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#C8C7CC"
    },
    weekday: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    monthday: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        opacity: 0.7
    }


} );

const DateHeader = ( { today, date } ) => {
    const weekday = moment( date ).calendar( today, {
        lastWeek: "[Last] dddd",
        lastDay: "[Yesterday]",
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        sameElse: "dddd"
    } ).toUpperCase();

    const monthday = moment( date ).calendar( today, {
        lastWeek: "MMM D",
        lastDay: "ddd, MMM D",
        sameDay: "ddd, MMM D",
        nextDay: "ddd, MMM D",
        nextWeek: "MMM D",
        sameElse: "MMM D"
    } ).toUpperCase();

    return (
        <View style={ styles.header }>
            <Text style={ styles.weekday }>{ weekday }</Text>
            <Text style={ styles.monthday }> { monthday }</Text>
        </View>
    );
};

const TextHeader = ( { text } ) => {
    return (
        <View style={ styles.header }>
            <Text style={ styles.weekday }>{ text }</Text>
        </View>
    );
};

const Header = ( { section: { today, date, ongoing } } ) => {
    return ongoing
        ? <TextHeader text="ONGOING"/>
        : <DateHeader today={ today } date={ date }/>
    ;
};

export default Header;
