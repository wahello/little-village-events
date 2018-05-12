import { TouchableButton } from "../touchable";

import { Text, Animated, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create( {
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 28,
        borderRadius: 28,
        backgroundColor: "#efeff4"
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10,
        color: "#007aff"
    }
} );


const Label = ( { style, label } ) => (
    <Text style={ [ styles.buttonLabel, style ] }>
        {label}
    </Text>
);

export default ( { label, renderLabel, onPress, style } ) => {
    const { button: buttonStyle, label: labelStyle } = style || {};

    renderLabel = renderLabel || Label;

    return (
        <TouchableButton onPress={ onPress }>
            <Animated.View style={ [ styles.button, buttonStyle ] }>
                { renderLabel( { label, style: [ styles.buttonLabel, labelStyle ] } ) }
            </Animated.View>
        </TouchableButton>
    );
}
