import { View, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create( {
    root: {
        alignSelf: "stretch",

        margin: 6,
        padding: 10,

        borderRadius: 10,
        backgroundColor: "#ffffff",

        shadowColor: "rgba(227, 227, 227, 0.38)",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 30,
        shadowOpacity: 1
    }
} );


export default ( { style, children } ) => {
    return (
        <View style={ [ styles.root, style || {} ] }>
            { children }
        </View>
    );
}
