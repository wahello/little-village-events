import StatusBarSpacer from "..";

import { View, StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        backgroundColor: "blue"
    },
} );


storiesOf( "StatusBarSpacer", module )
    .add( "default", () => (
        <View style={styles.root}>
            <StatusBarSpacer style={ { backgroundColor: "red" } }/>
        </View>
    ) )
;
