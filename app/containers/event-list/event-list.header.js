import React from "react";
import { StyleSheet, View, Text } from "react-native";
import moment from "moment";

const styles = StyleSheet.create( {
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        height: 34,

        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        backgroundColor: "black",
    },
    weekday: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    monthday: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    }


} );

const Header = ( { section: { today, date } } ) => {
    const weekday = moment( date ).calendar( today, {
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        sameElse: "dddd"
    } ).toUpperCase();

    const monthday = moment( date ).calendar( today, {
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

export default Header;
