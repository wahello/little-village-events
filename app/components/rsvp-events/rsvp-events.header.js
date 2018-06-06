import ScopeSelector from "./rsvp-events.scope-selector";
import StatusBarSpacer from "../status-bar-spacer";

import * as Styles from "../../styles";

import React from "react";
import { Text, View } from "react-native";


const styles = Styles.create( Styles.tabHeader, {
    root: {
        paddingBottom: 6,

        borderBottomColor: Styles.variables.borderColor,
        borderBottomWidth: Styles.variables.borderWidth,
    }
} );

const RsvpEventsHeader = ( { upcoming, flipUpcoming } ) => (
    <View style={ styles.root }>
        <StatusBarSpacer/>
        <Text style={ styles.label }>You’re going</Text>
        <ScopeSelector upcoming={ upcoming } flipUpcoming={ flipUpcoming }/>
    </View>
);

export default RsvpEventsHeader;
