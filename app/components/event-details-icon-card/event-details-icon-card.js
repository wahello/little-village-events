import DetailsCard from "../event-details-card";

import { View, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create( {
    card: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginLeft: 6,
        marginRight: 9
    },
    column: {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 6
    },
    button: {
        marginLeft: 9,
        marginRight: 6
    }
} );

export default ( { style, renderIcon, renderButton, children } ) => {
    return (
        <DetailsCard style={ [ styles.card, style ] } >
            { renderIcon && renderIcon( { style: styles.icon } ) }
            <View style={ styles.column }>{ children }</View>
            { renderButton && renderButton( { style: styles.button } ) }
        </DetailsCard>
    );
}
