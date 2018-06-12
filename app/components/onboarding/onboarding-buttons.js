import { TouchableButton } from "../../components/touchable";
import variables from "../../styles/variables";

import { Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    skipButton: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 50
    },
    skipButtonLabel: {
        fontSize: variables.largeFontSize
    },
    continueButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 50,
        backgroundColor: variables.highlightColor
    },
    continueButtonLabel: {
        fontSize: variables.largeFontSize,
        fontWeight: "700",
        color: "#fff"
    }
} );


export const SkipButton = ( { label = "Skip", style, ...props } ) =>
    <TouchableButton style={ [ styles.skipButton, style ] } {...props}>
        <Text style={ styles.skipButtonLabel }>{label}</Text>
    </TouchableButton>
;


export const ContinueButton = ( { label = "Continue", style, ...props } ) =>
    <TouchableButton style={ [ styles.continueButton, style ] } {...props}>
        <Text style={ styles.continueButtonLabel }>{label}</Text>
    </TouchableButton>
;
