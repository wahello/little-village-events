import { TouchableButton } from "../../components/touchable";

import { injectState } from "@textpress/freactal";

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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

const LeftPanel = ( { event: { imageUrl } } ) => {
    if ( !imageUrl )
        return <View style={ styles.leftPanel }/>;

    return (
        <Image style={ styles.leftPanel }
            source={ { uri: `${imageUrl}-/resize/x${imageSize}/-/crop/${imageSize}x${imageSize}/center/` } }
        />
    );
};

const Location = ( { event } ) => {
    const { allDay, startTime, venueName } = event;

    const time = ( allDay && "All Day" )
        || ( startTime && moment( startTime ).format( "h:mma" ) )
        || ""
    ;
    const location = venueName ? `@ ${venueName}` : "";
    const value = [ time, location ].filter( v => !!v ).join( " " );
    return value
        ? <Text style={ styles.location }>{ value }</Text>
        : null
    ;
};

const Days = ( { event } ) => {
    const { startTime, endTime } = event;
    if ( !startTime || !endTime || startTime.diff( endTime, "days" ) === 0 )
        return null;
    const format = "MMM. D";
    const value = `${startTime.format( format )} - ${endTime.format( format )}`;
    return <Text style={ styles.location }>{ value }</Text>;
};

const Hashtag = ( { event } ) => {
    const { categories } = event;
    const hashtags = categories
        .map( c => c.name )
        .filter( n => !!n )
        .map( n => n.toUpperCase() )
        .join( " " )
    ;
    return hashtags
        ? <Text style={ styles.hashtag }>{ hashtags }</Text>
        : null
    ;
};

const Item = ( { item: event, effects: { navigateToEventDetails }, state } ) => (
    <TouchableButton activeOpacity={ 0.6 }
        onPress={ () => navigateToEventDetails( event ) }>
        <View style={ styles.card }>
            <LeftPanel event={ event }/>
            <View style={ styles.rightPanel }>
                <View style={ styles.info }>
                    <Text style={ styles.name }>
                        { event.name }
                    </Text>
                    <Location event={ event }/>
                    <Days event={ event }/>
                </View>
                <Hashtag event={ event } state={ state }/>
            </View>
        </View>
    </TouchableButton>
);

export default compose(
    injectState
)( Item );
