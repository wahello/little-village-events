import { SkipButton, ContinueButton } from "./onboarding-buttons";
import Hr from "../../components/hr";
import StatusBarSpacer from "../../components/status-bar-spacer";

import variables from "../../styles/variables";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { Fragment } from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        backgroundColor: variables.panelBackgroundColor
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
    },
    title: {
        fontSize: variables.regularFontSize,
        fontWeight: "500"
    },
    picker: {
        backgroundColor: variables.bodyBackgroundColor
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        minHeight: 84
    },
    skipButton: {
        backgroundColor: "#DADADA",
    },
    continueButton: {
        position: "absolute",
        alignSelf: "center",
        bottom: 20
    }
} );


const Header = ( { title } ) =>
    <Fragment>
        <StatusBarSpacer />
        <View style={ styles.header }>
            <Text style={ styles.title }>{ title }</Text>
        </View>
    </Fragment>
;


export default ( { state, title, children, onSkip, onContinue } ) =>
    <View style={ styles.root }>
        <Header title={ title }/>
        <Hr />
        <ScrollView style={ styles.picker }>
            { children }
            <View style={ styles.footer } >
                { state.canSkip
                    ? <SkipButton style={ styles.skipButton} onPress={ onSkip } />
                    : null
                }
            </View>
        </ScrollView>
        { state.canContinue
            ? <ContinueButton style={ styles.continueButton } onPress={ onContinue } />
            : null
        }
    </View>
;
