import { eventImage } from "../../utils/event";

import { injectState } from "@textpress/freactal";

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { compose } from "recompose";

const imageSize = 90;

const styles = StyleSheet.create( {
    card: {
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "stretch",

        margin: 6,
        padding: 10,

        borderRadius: 10,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(227, 227, 227, 0.38)",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 30,
        shadowOpacity: 1
    },

    leftPanel: {
        flex: 0,
        width: imageSize,
        height: imageSize,
        borderRadius: 4
    },

    rightPanel: {
        flex: 1,
        paddingLeft: 18,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        alignItems: "stretch",
    },

    info: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },

    name: {
        flex: 0,

        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000"
    },

    location: {
        flex: 0,

        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000"
    },

    hashtag: {
        flex: 0,

        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#4a4a4a"
    }

} );

const detailsView = {
    screen: "events.details",
    title: "Details",
    backButtonTitle: ""
};

const thumbnailSource = ( event ) => {
    const image = eventImage( event );
    return image ? { uri: `${image}-/resize/x${imageSize}/-/crop/${imageSize}x${imageSize}/center/` } : null;
};

const LeftPanel = ( { item } ) => {
    const image = thumbnailSource( item );
    return image
        ? <Image style={ styles.leftPanel } source={ image }/>
        : <View style={ styles.leftPanel }/>
    ;
};

const Location = ( { item } ) => {
    const { allday, starttime, venue: { name } = {} } = item;

    const time = ( allday && "All Day" )
        || ( starttime && moment( starttime ).format( "h:mma" ) )
        || ""
    ;
    const location = name ? `@ ${name}` : "";
    const value = [ time, location ].filter( v => !!v ).join( " " );
    return value
        ? <Text style={ styles.location }>{ value }</Text>
        : null
    ;
};

const Days = ( { item } ) => {
    const { starttime, endtime } = item;
    if ( !starttime || !endtime || moment( starttime ).diff( endtime, "days" ) === 0 )
        return null;
    const format = "MMM. D";
    const value = `${moment( starttime ).format( format )} - ${moment( endtime ).format( format )}`;
    return <Text style={ styles.location }>{ value }</Text>;
};

const Hashtag = ( { item, state } ) => {
    const { categories } = item;
    const { categories: allCategories } = state;
    const hashtags = ( categories || [] )
        .map( c => allCategories[ "" + c.id ] || null )
        .filter( n => !!n )
        .map( n => `#${n.toUpperCase()}` )
        .join( " " )
    ;
    return hashtags
        ? <Text style={ styles.hashtag }>{ hashtags }</Text>
        : null
    ;
};

const Item = ( { item, navigator, state } ) => (
    <TouchableOpacity activeOpacity={ 0.6 }
        onPress={ () => navigator.push( { ...detailsView, passProps: { event: item } } ) }>
        <View style={ styles.card }>
            <LeftPanel item={ item }/>
            <View style={ styles.rightPanel }>
                <View style={ styles.info }>
                    <Text style={ styles.name }>
                        { item.name }
                    </Text>
                    <Location item={ item }/>
                    <Days item={ item }/>
                </View>
                <Hashtag item={ item } state={ state }/>
            </View>
        </View>
    </TouchableOpacity>
);

export default compose(
    injectState
)( Item );
