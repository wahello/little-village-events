import { TouchableButton } from "../touchable";

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import URL from "url";


const styles = StyleSheet.create( {
    root: {
        flex: 0,
        flexDirection: "row",

        paddingHorizontal: 2,

        backgroundColor: "#000000"
    },

    button: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        height: 44,
        width: 51
    },

    disabledButton: {
        opacity: .4
    },

    titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        height: 44
    },

    titleText: {
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#ffffff",
    }

} );


export const UrlTitle = ( { url } ) => {
    const title = [];

    if ( url ) {
        const parsedUrl = URL.parse( url );
        if ( parsedUrl.protocol === "https:" )
            title.push( "\uD83D\uDD12" );

        const hostname = parsedUrl.hostname && parsedUrl.hostname.startsWith( "www." )
            ? parsedUrl.hostname.substr( 4 )
            : parsedUrl.hostname
        ;

        title.push( hostname );
    }

    return (
        <View style={ styles.titleContainer }>
            <Text style={ styles.titleText }>
                { title }
            </Text>
        </View>
    );
};


export const Button = ( { children, disabled, onPress, style } ) => (
    <TouchableButton disabled={disabled} onPress={ onPress }
        style={ [ styles.button, style, disabled ? styles.disabledButton : null ] }>
        { children }
    </TouchableButton>
);

export default ( { children, style } ) => (
    <View style={ [ styles.root, style ] }>
        { children }
    </View>
);
