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

const ScopeSelectorButton = ( { value, selectedValue, setScope } ) => (
    <TouchableButton style={ styles.button } onPress={ () => { setScope( value ) } }>
        <Text style={ [ styles.label, styles[`${value}Label`], value === selectedValue ? styles.selectedLabel : null ] }>
            {labels[value]}
        </Text>
    </TouchableButton>

);


const ScopeSelector = ( { scope, setScope } ) => (
    <View style={ styles.root }>
        <ScopeSelectorButton value="upcoming" selectedValue={ scope } setScope={ setScope }/>
        <ScopeSelectorButton value="past" selectedValue={ scope } setScope={ setScope }/>
    </View>
);


export default ScopeSelector;
