import * as Styles from "../../styles";

import { formatStartTime } from "../../utils/event";
import { eventTense } from "../../utils/event-time";

import React from "react";
import { View, Text } from "react-native";


const stylesSize = {
    regular: Styles.create( {
        root: {
            paddingVertical: 4,
            paddingHorizontal: 6,
            borderRadius: 3
        },

        label: {
            fontSize: Styles.variables.regularFontSize,
            fontWeight: "600"
        }
    } ),
    small: Styles.create( {
        root: {
            paddingHorizontal: 6,
            paddingVertical: 4,
            borderRadius: 3
        },

        label: {
            fontSize: Styles.variables.smallFontSize,
            fontWeight: "600"
        }
    } )

};

const colorsByTense = {
    past: Styles.create( {
        root: {
            backgroundColor: Styles.variables.mediumGrayColor
        },
        label: {
            color: Styles.variables.invertedTextColor
        }
    } ),
    present: Styles.create( {
        root: {
            backgroundColor: Styles.variables.warningColor
        },
        label: {
            color: Styles.variables.invertedTextColor
        }
    } ),
    upcoming: Styles.create( {
        root: {
            backgroundColor: Styles.variables.highlightColor
        },
        label: {
            color: Styles.variables.invertedTextColor
        }
    } ),
    future: Styles.create( {
        root: {
            backgroundColor: Styles.variables.highlightColorLight
        },
        label: {
            color: Styles.variables.textColor
        }
    } ),

};


const EventTime = ( { eventItem, calendarDay, ongoing, size = "small" } ) => {

    const styles = stylesSize[size];
    const tense = ongoing ? "future" : eventTense( eventItem, calendarDay );
    const colors = colorsByTense[ tense ];

    return (
        <View style={ [ styles.root, colors.root ] }>
            <Text style={ [ styles.label, colors.label ] }>
                { formatStartTime( eventItem ).toUpperCase() }
            </Text>
        </View>
    );
};

export default EventTime;
