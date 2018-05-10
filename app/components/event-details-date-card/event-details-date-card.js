import { CalendarIcon } from "../icons";

import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        alignSelf: "stretch",
        maxHeight: 64,

        margin: 6,
        padding: 10,

        borderRadius: 10,
        backgroundColor: "#ffffff",

        shadowColor: "rgba(227, 227, 227, 0.38)",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 30,
        shadowOpacity: 1
    },
    icon: {
        paddingLeft: 6,
    },
    column: {
        flex: 1,
        paddingLeft: 15,
    },
    date: {
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
        paddingTop: 1
    }
} );


const Date = ( { date } ) =>
    <Text style={ styles.date }>
        { moment( date ).format( "dddd, MMM D" ) }
    </Text>
;


const Time = ( { starttime } ) => {
    return (
        <Text style={ styles.date }>
            { moment( starttime ).format( "h:mm A" ) }
        </Text>
    );
};


export default ( { event } ) => {
    const { starttime, endtime } = event;
    if ( !starttime )
        return null;

    return (
        <View style={ styles.root }>
            <View style={ styles.icon }><CalendarIcon /></View>
            <View style={ styles.column }>
                <Date date={starttime} />
                <Time starttime={starttime} endtime={endtime} />
            </View>
        </View>
    );
}
