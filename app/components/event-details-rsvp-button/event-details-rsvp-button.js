import { TouchableButton } from "../touchable";
import CheckmarkIcon from "../icons/rsvp-checkmark";

import { View, Text, Animated, StyleSheet } from "react-native";
import React from "react";

import numeral from "numeral";


const styles = StyleSheet.create( {
    column: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        maxHeight: 45
    },
    row: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        maxHeight: 45
    },

    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 28,
        minWidth: 60,
        borderRadius: 28,
        backgroundColor: "#efeff4"
    },

    buttonLabel: {
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10,
        color: "#007aff"
    },

    goingButton: {
        backgroundColor: "#007aff"
    },

    goingButtonIcon: {
        marginLeft: 4,
        height: 24,
        width: 24,
        color: "#efeff4"
    },

    goingButtonLabel: {
        color: "#efeff4",
        paddingLeft: 0
    },

    smallPrint: {
        fontSize: 11,
        fontWeight: "400",
        color: "white",
        marginTop: 2
    }
} );


const SmallPrint = ( { text } ) =>
    <Text style={ styles.smallPrint }>{ text }</Text>
;


const formatPrice = ( price, forceDecimals ) =>
    numeral( price ).format( forceDecimals ? "$0,0.00" : "$0,0[.]00" )
;


const priceLabel = priceRange => priceRange
    .map( price => formatPrice( price, priceRange.length === 1 ) )
    .join( "-" )
;

const GoingButton = () => {
    const label = "GOING";
    return (
        <View style={ styles.row }>
            <Animated.View style={ [ styles.button, styles.goingButton ] }>
                <CheckmarkIcon style={ [ styles.goingButtonIcon ] }/>
                <Text style={ [ styles.buttonLabel, { fontSize: 14 }, styles.goingButtonLabel ] }>
                    { label }
                </Text>
            </Animated.View>
        </View>
    );

};

const RSVPButton = ( { event: { details } } ) => {
    if ( !details )
        return null;

    const { priceRange } = details;
    const isFree = !priceRange.length;
    const label = isFree ? "RSVP" : priceLabel( priceRange );

    return (
        <View style={ styles.column }>
            <Animated.View style={ styles.button }>
                <Text style={ [ styles.buttonLabel, { fontSize: label.length < 8 ? 16 : 14 } ] }>
                    { label }
                </Text>
            </Animated.View>
            { isFree ? null : <SmallPrint text="Buy tickets"/> }
        </View>
    );

};

export default ( { event, handleRSVP } ) => {
    if ( !event.rsvp && !event.details )
        return null;

    return (
        <TouchableButton onPress={ handleRSVP }>
            { event.rsvp
                ? <GoingButton/>
                : <RSVPButton event={ event }/>
            }
        </TouchableButton>
    );
}
