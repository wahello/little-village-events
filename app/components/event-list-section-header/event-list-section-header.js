import SectionListHeader from "app/components/section-list-header";
import { calendarFormat } from "app/utils/date";

import variables from "app/styles/variables";

import { StyleSheet, Text } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    weekday: {
        fontSize: variables.largeFontSize,
        fontWeight: "600",
        color: variables.textColor,
    },

    monthday: {
        fontSize: variables.regularFontSize,
        fontWeight: "500",
        color: variables.textColor,
        opacity: 0.7
    }
} );


const DateHeader = ( { today, date } ) => {
    const weekday = calendarFormat( date, today, {
        lastWeek: "[Last] dddd",
        lastDay: "[Yesterday]",
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        sameElse: "dddd"
    } ).toUpperCase();

    const monthday = calendarFormat( date, today, {
        lastWeek: "MMM D",
        lastDay: "ddd, MMM D",
        sameDay: "ddd, MMM D",
        nextDay: "ddd, MMM D",
        nextWeek: "MMM D",
        sameElse: "MMM D"
    } ).toUpperCase();

    return (
        <SectionListHeader>
            <Text style={ styles.weekday }>{ weekday }</Text>
            <Text style={ styles.monthday }> { monthday }</Text>
        </SectionListHeader>
    );
};


const TextHeader = ( { text } ) =>
    <SectionListHeader>
        <Text style={ styles.weekday }>{ text }</Text>
    </SectionListHeader>
;


export default ( { section: { today, date, ongoing } } ) => ongoing
    ? <TextHeader text="ONGOING"/>
    : <DateHeader today={ today } date={ date }/>
;
