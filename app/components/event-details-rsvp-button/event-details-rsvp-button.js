// import { CalendarIcon } from "../icons";

import { TouchableHighlight, View, Text, Animated, StyleSheet } from "react-native";
import React from "react";

import numeral from "numeral";
import values from "lodash/values";
import toNumber from "lodash/toNumber";
import last from "lodash/last";


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


const priceRange = tickets => {
    const result = values( tickets || [] )
        .map( t => toNumber( t.price ) )
        .sort( ( x, y ) => x > y );

    return result.length > 2
        ? [ result[0], last( result ) ]
        : result;
};


const formatPrice = price => numeral( price ).format( "$0,0" );
const priceLabel = priceRange =>
    priceRange.map( formatPrice ).join( "-" );


export default ( { event } ) => {
    const tickets = priceRange( event.tickets );
    const isFree = !tickets.length || last( tickets ) === 0.0;

    return (
        <TouchableHighlight>
            <View style={ styles.column }>
                <Button label={ isFree ? "RSVP" : priceLabel( tickets )} />
                { isFree ? null : <SmallPrint text="Buy tickets" /> }
            </View>
        </TouchableHighlight>
    );
}