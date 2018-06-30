import { View, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
} );


export default ( { children, style } ) =>
    <View style={ [ styles.root, style ] }>
        { children }
    </View>
;
