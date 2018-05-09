import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
} );

export const Content = () => {
    return (
        <View style={ styles.wrapper }>
            <Text>SOME TITLE</Text>
        </View>
    );
};

export const Background = ( { uri } ) => {
    const style = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    return <Image style={ styles.background } source={ { uri } }/>;
};
