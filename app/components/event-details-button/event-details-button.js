import { TouchableButton } from "../touchable";

import { Text, Animated, StyleSheet } from "react-native";
import React from "react";

import _isObject from "lodash/isObject";

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
        paddingLeft: 14,
        paddingRight: 14,
        color: "#007aff"
    }
} );


const Label = ( { style, label } ) => (
    <Text style={ [ styles.buttonLabel, style ] }>
        {label}
    </Text>
);

export default ( { label, renderLabel, onPress, style } ) => {
    const labelStyle = _isObject( style ) && style.label || null;
    const buttonStyle = _isObject( style ) && style.button || style;

    renderLabel = renderLabel || Label;

    return (
        <TouchableButton onPress={ onPress }>
            <Animated.View style={ [ styles.button, buttonStyle ] }>
                { renderLabel( { label, style: [ styles.buttonLabel, labelStyle ] } ) }
            </Animated.View>
        </TouchableButton>
    );
}
