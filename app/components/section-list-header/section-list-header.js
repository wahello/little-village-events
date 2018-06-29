import variables from "app/styles/variables";

import { StyleSheet, View } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        height: 38,
        paddingHorizontal: 16,
        paddingTop: 3,
        paddingBottom: 2,
        backgroundColor: variables.panelBackgroundColor,

        borderBottomWidth: variables.borderWidth,
        borderBottomColor: variables.borderColor
    }
} );


export default ( { children, style } ) =>
    <View style={ [ styles.root, style ] }>
        { children }
    </View>
;
