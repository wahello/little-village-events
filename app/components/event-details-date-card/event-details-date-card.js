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


const Date = ( { event } ) =>
    <Text style={ styles.date }>
        { formatStartDate( event ) }
    </Text>
;

const AddToCalendar = ( { event, addEventToCalendar } ) => {
    const { endTime } = event;
    return !endTime ? (
        <DetailsButton style={ { button: styles.calendarButton, label: styles.calendarButtonLabel } } label="+" onPress={ () => addEventToCalendar( event ) }/>
    ) : null;
};

export default ( { event, calendarDay, addEventToCalendar } ) => {
    const { startTime } = event;
    if ( !startTime )
        return null;

    return (
        <DetailsIconCard
            style={ styles.root }
            renderIcon={ CalendarIcon }
            renderButton={ () => (
                <AddToCalendar
                    event={ event }
                    addEventToCalendar={ addEventToCalendar }
                />
            ) }
        >
            <Date event={ event }/>
            <View style={ styles.timeContainer }>
                <EventTime event={ event } calendarDay={ calendarDay } size="regular"/>
            </View>
        </DetailsIconCard>
    );
}
