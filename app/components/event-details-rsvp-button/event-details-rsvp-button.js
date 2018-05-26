import { TouchableButton } from "../touchable";
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
    smallPrint: {
        fontSize: 11,
        fontWeight: "400",
        color: "white",
        marginTop: 2
    }
} );


const Button = ( { label } ) =>
    <Animated.View style={ styles.button }>
        <Text style={ [ styles.buttonLabel, { fontSize: label.length < 8 ? 16 : 14 } ] }>
            {label}
        </Text>
    </Animated.View>
;


const SmallPrint = ( { text } ) =>
    <Text style={ styles.smallPrint }>{text}</Text>
;


const formatPrice = ( price, forceDecimals ) =>
    numeral( price ).format( forceDecimals ? "$0,0.00" : "$0,0[.]00" )
;


const priceLabel = priceRange => priceRange
    .map( price => formatPrice( price, priceRange.length === 1 ) )
    .join( "-" )
;


export default ( { event: { details }, handleRSVP } ) => {
    if ( !details )
        return null;

    const { priceRange } = details;
    const isFree = !priceRange.length;

    return (
        <TouchableButton onPress={ handleRSVP }>
            <View style={ styles.column }>
                <Button label={ isFree ? "RSVP" : priceLabel( priceRange )} />
                { isFree ? null : <SmallPrint text="Buy tickets" /> }
            </View>
        </TouchableButton>
    );
}
