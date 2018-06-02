import * as Styles from "../../styles";

import { formatStartTime } from "../../utils/event";
import { eventTense } from "../../utils/event-time";

import React from "react";
import { View, Text } from "react-native";


const stylesSize = {
    regular: Styles.create( {
        root: {
            paddingHorizontal: 8,
            paddingVertical: 5,

            borderRadius: 5
        },

        label: {
            fontSize: Styles.variables.regularFontSize
        }

    } ),
    small: Styles.create( {
        root: {
            paddingHorizontal: 4,
            paddingVertical: 3,

            borderRadius: 5
        },

        label: {
            fontSize: Styles.variables.smallFontSize
        }

    } )

};

const colorsByTense = {
    past: Styles.create( {
        root: {
            backgroundColor: Styles.variables.mediumGrayColor
        },
        label: {
            color: Styles.variables.textColor
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
            backgroundColor: Styles.variables.mediumGrayColor
        },
        label: {
            color: Styles.variables.invertedTextColor
        }
    } ),

};


const EventTime = ( { event, calendarDay, size = "small" } ) => {

    const styles = stylesSize[size];
    const tense = eventTense( event, calendarDay );
    const colors = colorsByTense[ tense ];

    return (
        <View style={ [ styles.root, colors.root ] }>
            <Text style={ [ styles.label, colors.label ] }>
                { formatStartTime( event ) }
            </Text>
        </View>
    );
};

export default EventTime;
