import { TouchableLink } from "../touchable";
import Button from "../event-details-button";
import Card from "../event-details-icon-card";

import { PhoneIcon, PinIcon } from "../icons";

import React, { Fragment } from "react";
import { parseLocation } from "parse-address";
import { Text, View, StyleSheet } from "react-native";
import openMap from "react-native-open-maps";

import _isFinite from "lodash/isFinite";


const styles = StyleSheet.create( {
    row: {
        flexDirection: "row",
    },
    name: {
        fontSize: 16,
        fontWeight: "600"
    },
    call: {
        marginLeft: 6

    },
    address: {
        fontSize: 12
    }

} );

const NameAndPhone = ( { name, phone, call } ) => {
    const parts = [];
    if ( name ) {
        parts.push(
            <Text key="name" style={ styles.name }>
                { name }
            </Text>
        );
    }

    if ( phone ) {
        parts.push(
            <TouchableLink key="call" style={ styles.call } onPress={ () => call( phone.replace( /[- ()]/g, "" ) ) }>
                <PhoneIcon/>
            </TouchableLink>
        );
    }
    return parts.length ? (
        <View style={ styles.row }>
            { parts }
        </View>
    ) : null;
};

function joinAddressParts( parts, separator = " " ) {
    return parts
        .filter( p => !!p )
        .join( separator )
}

const Address = ( { address } ) => {
    const parsedAddress = address && parseLocation( address );
    if ( !parsedAddress )
        return null;

    const line1 = joinAddressParts( [
        parsedAddress.number,
        parsedAddress.prefix,
        parsedAddress.street,
        parsedAddress.type,
        parsedAddress.suffix,
        parsedAddress.sec_unit_type,
        parsedAddress.sec_unit_num
    ] );

    const line2 = joinAddressParts( [
        parsedAddress.city,
        joinAddressParts( [ parsedAddress.state, parsedAddress.zip ] )
    ], ", " );

    const parts = [ line1, line2 ]
        .map( ( line, index ) => line && <Text key={ index } style={ styles.address }>{ line.toUpperCase() }</Text> );
    return parts.length ? (
        <Fragment>{ parts }</Fragment>
    ) : null;
};

const DirectionsButton = ( { name, latitude, longitude, style } ) => {
    return _isFinite( latitude ) && _isFinite( longitude )
        ? <Button style={ style } label="Directions" onPress={ () => openMap( { longitude, latitude, name } ) }/>
        : null
    ;
};

export const VenueCard = ( { venue, call } ) => (
    <Card
        style={ styles.root }
        renderIcon={ PinIcon }
        renderButton={ ( { style } ) => (
            <DirectionsButton style={ style } name={ venue.name } latitude={ venue.latitude }
                longitude={ venue.longitude }/>
        ) }
    >
        <NameAndPhone name={ venue.name } phone={ venue.phone } call={ call }/>
        <Address address={ venue.address }/>
    </Card>
);

export default ( { event, call } ) => {
    const { venue } = event;
    if ( !venue )
        return null;

    return <VenueCard venue={ venue } call={ call }/>;
}
