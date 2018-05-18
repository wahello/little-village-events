import { NextIcon, PreviousIcon, ShareIcon, SafariIcon } from "../icons";
import { TouchableButton } from "../touchable";


import React from "react";
import { View, StyleSheet } from "react-native";


const styles = StyleSheet.create( {
    root: {
        flex: 0,
        flexDirection: "row",

        paddingHorizontal: 2,

        backgroundColor: "black"
    },

    button: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        height: 44,
        width: 44
    },

    disabledButton: {
        opacity: .4
    }

} );

const Button = ( { children, onPress } ) => (
    <TouchableButton disabled={ !onPress } onPress={ onPress } style={ [ styles.button, !onPress ? styles.disabledButton : undefined ] } >
        { children }
    </TouchableButton>
);

export default ( { goBack, goForward, share, openInBrowser } ) => (
    <View style={ styles.root } >
        <Button onPress={ goBack } >
            <PreviousIcon/>
        </Button>
        <Button onPress={ goForward } >
            <NextIcon/>
        </Button>
        <Button onPress={ share } >
            <ShareIcon/>
        </Button>
        <Button onPress={ openInBrowser } >
            <SafariIcon/>
        </Button>
    </View>
);
