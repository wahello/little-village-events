import DetailsCard from "../event-details-card";

import { View, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    icon: {
        paddingLeft: 6,
    },
    column: {
        flex: 1,
        paddingLeft: 15,
    }
} );

export default ( { style, renderIcon, children } ) => {
    return (
        <DetailsCard style={ style } >
            <View style={ styles.icon }>{ renderIcon() }</View>
            <View style={ styles.column }>{ children }</View>
        </DetailsCard>
    );
}
