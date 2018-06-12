import { SkipButton, ContinueButton } from "./onboarding-buttons";
import variables from "../../styles/variables";

import { View, Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: variables.panelBackgroundColor
    },
    intro: {
        maxWidth: 290,
        margin: 40
    },
    title: {
        fontSize: 34,
        fontWeight: "800",
        lineHeight: 38,
        marginBottom: 12
    },
    text: {
        fontSize: variables.largeFontSize,
        lineHeight: Math.round( variables.largeFontSize * 1.4 ),
    },
    continueButton: {
        marginTop: 24
    },
    skipButton: {
        position: "absolute",
        alignSelf: "center",
        bottom: 20
    }
} );


const Title = ( { children } ) =>
    <Text style={ styles.title }>
        { children }
    </Text>
;


export default ( { title, text, children, onSkip, onContinue } ) =>
    <View style={ styles.root }>
        <View style={ styles.intro }>
            <Title>{ title }</Title>
            { text ? <Text style={ styles.text }>{ text }</Text> : null }
            { children }
            <ContinueButton style={ styles.continueButton } onPress={ onContinue } />
        </View>
        <SkipButton style={ styles.skipButton } onPress={ onSkip } />
    </View>
;
