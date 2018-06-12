import { ContinueButton } from "./onboarding-buttons";

import Logo from "../../components/icons/branding/logo";

import variables from "../../styles/variables";

import LinearGradient from "react-native-linear-gradient";

import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: variables.panelBackgroundColor
    },
    background: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    backgroundGradient: {
        flex: 1
    },
    main: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 370,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 60,
    },
    logo: {
        width: "100%",
        height: 90,
        color: "#fff"
    },
    tagline: {
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
        paddingTop: 14
    },
    footer: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        maxWidth: 370,
        paddingLeft: 40,
        paddingRight: 40,
    },
    footerText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center",
        paddingBottom: 14
    }
} );


const Background = () =>
    <ImageBackground
        style={ styles.background }
        source={ require( "./assets/cover.jpg" ) }
    >
        <LinearGradient
            style={ styles.backgroundGradient }
            locations={[ 0, .25, .6, 1 ]}
            colors={[ "rgba(0,0,0,.2)", "rgba(0,0,0,.28)", "rgba(0,0,0,.28)", "rgba(0,0,0,.2)" ]}
        />
    </ImageBackground>
;




export default ( { onContinue } ) =>
    <View style={ styles.root }>
        <Background />
        <View style={ styles.main }>
            <Logo style={ styles.logo } />
            <Text style={ styles.tagline }>
                { "The village is yours.\nCome out and play." }
            </Text>
        </View>
        <View style={ styles.footer }>
            <Text style={ styles.footerText }>
                The best local events in the palm of your hand, curated by Little Village
            </Text>
            <ContinueButton onPress={ onContinue } />
        </View>
    </View>
;
