import DetailsIconCard from "../event-details-icon-card";

import { CalendarIcon } from "../icons";

import moment from "moment";
import { Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        height: 64
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
        <DetailsIconCard style={ styles.root } renderIcon={ CalendarIcon } >
            <Date date={starttime} />
            <Time starttime={starttime} endtime={endtime} />
        </DetailsIconCard>
    );
}
