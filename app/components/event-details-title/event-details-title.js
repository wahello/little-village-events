import { Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        fontSize: 18,
        fontWeight: "700",
        width: 220,
        color: "white"
    }
} );


export default ( { event } ) =>
    <Text numberOfLines={3} style={ styles.root }>
        {event.name}
    </Text>
;
