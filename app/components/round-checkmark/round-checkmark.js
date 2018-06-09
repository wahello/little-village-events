import CheckmarkIcon from "../icons/checkmark";
import variables from "../../styles/variables";

import { View, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: variables.highlightColor
    },
    icon: {
        height: "100%",
        width: "100%",
        color: "white"
    }
} );


const sizeStyle = size => ( {
    width: size,
    height: size,
    borderRadius: Math.round( size / 2 )
} );


export default ( { style, checked, size = 22, ...props } ) => checked
    ? (
        <View style={[ styles.root, sizeStyle( size ), style ]} {...props} >
            <CheckmarkIcon style={ styles.icon } />
        </View> )
    : null
;
