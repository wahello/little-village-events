import { TouchableButton } from "../touchable";

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import URL from "url";


const styles = StyleSheet.create( {
    root: {
        flex: 0,
        flexDirection: "row",

        paddingTop: 20,
        paddingHorizontal: 2,

        backgroundColor: "#000000"
    },

    button: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        height: 44
    },

    text: {
        marginHorizontal: 6,

        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#ffffff",
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
    }

} );


const Title = ( { url } ) => {
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
        <Text style={ styles.text }>
            { title }
        </Text>
    );
};

export const Button = ( { children, onPress, style } ) => (
    <TouchableButton disabled={ !onPress } onPress={ onPress }
        style={ [ styles.button, !onPress ? styles.disabledButton : undefined, style ] }>
        { children }
    </TouchableButton>
);

export default ( { url, onClose, children } ) => (
    <View style={ styles.root }>
        <Button onPress={ onClose }>
            <Text style={ styles.text }>Done</Text>
        </Button>
        <View style={ styles.titleContainer }>
            <Title url={ url }/>
        </View>
        { children }
    </View>
);
