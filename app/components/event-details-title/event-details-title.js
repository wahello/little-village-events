import { Animated, Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    title: {
        fontSize: 18,
        fontWeight: "700",
        width: 220,
        color: "white"
    }
} );


export default ( { event, ...props } ) =>
    <Animated.View {...props}>
        <Text numberOfLines={3} style={ styles.title }>
            {event.name}
        </Text>
    </Animated.View>
;
