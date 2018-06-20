import DetailsIconCard from "../event-details-icon-card";
import DetailsButton from "../event-details-button";
import EventTime from "../event-time";

import CalendarIcon from "../icons/calendar";

import { formatStartDate } from "../../utils/event";

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
    },
    calendarButton: {
        width: 28,
        height: 28
    },
    calendarButtonLabel: {
        paddingHorizontal: 0
    }

} );


const Date = ( { eventItem } ) =>
    <Text style={ styles.date }>
        { formatStartDate( eventItem ) }
    </Text>
;

const AddToCalendar = ( { eventItem, addEventToCalendar } ) => {
    const { endTime } = eventItem;
    return !endTime ? (
        <DetailsButton style={ { button: styles.calendarButton, label: styles.calendarButtonLabel } } label="+" onPress={ () => addEventToCalendar( eventItem ) }/>
    ) : null;
};

export default ( { eventItem, calendarDay, addEventToCalendar } ) => {
    const { startTime } = eventItem;
    if ( !startTime )
        return null;

    return (
        <DetailsIconCard
            style={ styles.root }
            renderIcon={ CalendarIcon }
            renderButton={ () => (
                <AddToCalendar
                    eventItem={ eventItem }
                    addEventToCalendar={ addEventToCalendar }
                />
            ) }
        >
            <Date eventItem={ eventItem }/>
            <View style={ styles.timeContainer }>
                <EventTime eventItem={ eventItem } calendarDay={ calendarDay } size="regular"/>
            </View>
        </DetailsIconCard>
    );
}
