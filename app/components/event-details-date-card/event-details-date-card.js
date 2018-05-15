import DetailsIconCard from "../event-details-icon-card";

import { CalendarIcon } from "../icons";

import moment from "moment";
import { Text, View, StyleSheet } from "react-native";
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
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    startedColor: {
        color: "#D0021B",
    },
    started: {
        marginLeft: 4,
        marginTop: 1,
        fontSize: 11,
        fontWeight: "400",
    }

} );


const Date = ( { date } ) =>
    <Text style={ styles.date }>
        { moment( date ).format( "dddd, MMM D" ) }
    </Text>
;

export const isInProgress = ( now, eventStart, eventEnd ) => {
    eventStart = moment( eventStart );
    if ( now.isBefore( eventStart ) ) {
        // future event
        return false;
    }

    const startOfToday = moment( now.clone().startOf( "day" ) );
    if ( !eventEnd ) {
        // check if one-time events' day has not ended yet
        return !eventStart.isBefore( startOfToday );
    }

    eventEnd = moment( eventEnd );
    if ( eventEnd.isBefore( now ) ) {
        // event ended
        return false;
    }

    const startOfFirstEventDay = eventStart.clone().startOf( "day" );
    const startedDaysAgo = startOfToday.diff( startOfFirstEventDay, "days" );

    const todayStart = eventStart.clone().add( { days: startedDaysAgo } );
    if ( todayStart.isAfter( now ) ) {
        // ongoing event hasn't started today yet
        return false;
    }

    const startOfLastEventDay = eventEnd.clone().startOf( "day" );
    const daysRemained = startOfLastEventDay.diff( startOfToday, "days" );

    const todayEnd = eventEnd.clone().subtract( { days: daysRemained } );

    // check if ongoing event has not ended today yet
    return todayEnd.isAfter( now );
};

const Time = ( { starttime, endtime } ) => {
    const inProgress = isInProgress( moment(), starttime, endtime );
    return (
        <View style={ styles.timeContainer }>
            <Text style={ [ styles.date, inProgress ? styles.startedColor : {} ] }>
                { moment( starttime ).format( "h:mm A" ) }
            </Text>
            { inProgress ?
                (
                    <Text style={ [ styles.date, styles.started, styles.startedColor ] }>
                        Started
                    </Text>
                )
                : null
            }
        </View>
    );
};


export default ( { event } ) => {
    const { starttime, endtime } = event;
    if ( !starttime )
        return null;

    return (
        <DetailsIconCard style={ styles.root } renderIcon={ CalendarIcon }>
            <Date date={ starttime }/>
            <Time starttime={ starttime } endtime={ endtime }/>
        </DetailsIconCard>
    );
}
