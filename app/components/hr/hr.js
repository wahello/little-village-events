import variables from "../../styles/variables";

import { View, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        height: 1,
        borderBottomWidth: variables.borderWidth,
        borderBottomColor: variables.borderColor,
        opacity: .5
    }
} );


export default ( { style } ) => <View style={ [ styles.root, style ] } />;
