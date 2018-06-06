import { TouchableButton } from "../touchable/index";

import * as Styles from "../../styles";

import React from "react";
import { Text, View } from "react-native";

const styles = Styles.create( {
    root: {
        flex: 0,
        flexDirection: "row",
        marginHorizontal: Styles.variables.marginHorizontal
    },

    button: {
        flex: 1
    },

    label: {
        color: Styles.variables.grayTextColor,
        fontSize: Styles.variables.regularFontSize
    },

    upcomingLabel: {
        textAlign: "left"
    },

    pastLabel: {
        textAlign: "right"
    },

    selectedLabel: {
        color: Styles.variables.textColor
    }

} );


const labels = {
    upcoming: "UPCOMING EVENTS",
    past: "PAST EVENTS"
};

const ScopeSelectorButton = ( { value, isSelected, flipUpcoming } ) => (
    <TouchableButton style={ styles.button } onPress={ () => { !isSelected && flipUpcoming() } }>
        <Text style={ [ styles.label, styles[`${value}Label`], isSelected ? styles.selectedLabel : null ] }>
            {labels[value]}
        </Text>
    </TouchableButton>

);


const RsvpEventsScopeSelector = ( { upcoming, flipUpcoming } ) => (
    <View style={ styles.root }>
        <ScopeSelectorButton value="upcoming" isSelected={ upcoming } flipUpcoming={ flipUpcoming }/>
        <ScopeSelectorButton value="past" isSelected={ !upcoming } flipUpcoming={ flipUpcoming }/>
    </View>
);


export default RsvpEventsScopeSelector;
