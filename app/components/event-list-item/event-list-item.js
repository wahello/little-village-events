import EventHashtags from "../event-hashtags";
import EventTimeLocationRSVP from "../event-time-location-rsvp";
import { TouchableButton } from "../touchable";
import CheckmarkIcon from "../icons/rsvp-checkmark";

import { injectState } from "@textpress/freactal";

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { compose } from "recompose";
import imageUriBuilder from "../../utils/image-uri-builder";

const imageSize = 90;

const styles = StyleSheet.create( {
    card: {
        flex: 1,
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
        marginLeft: 18,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        alignItems: "stretch",
    },

    topSection: {
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "flex-start"
    },

    bottomSection: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        alignItems: "center"

    },

    info: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
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

    days: {
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
    },

    rsvpBadge: {
        flex: 0,
        height: 22,
        width: 22,
        borderRadius: 22,
        backgroundColor: "#007aff",
        alignSelf: "flex-start"
    },

    rsvpBadgeIcon: {
        height: 22,
        width: 22,
        color: "#efeff4",
    }


} );

const LeftPanel = ( { event } ) => {
    const uri = imageUriBuilder( event ).resize( imageSize );
    if ( !uri )
        return <View style={ styles.leftPanel }/>;

    return (
        <Image style={ styles.leftPanel }
            source={ { uri } }
        />
    );
};

const Days = ( { event } ) => {
    const { startTime, endTime } = event;
    if ( !startTime || !endTime || startTime.diff( endTime, "days" ) === 0 )
        return null;
    const format = "MMM. D";
    const value = `${startTime.format( format )} - ${endTime.format( format )}`;
    return <Text style={ styles.days }>{ value }</Text>;
};

const Item = ( props ) => {
    const { item: event, section: { date: calendarDay }, effects: { navigateToEventDetails } } = props;
    return (
        <TouchableButton activeOpacity={ 0.6 }
            onPress={ () => { navigateToEventDetails( event, calendarDay ) } }>
            <View style={ styles.card }>
                <LeftPanel event={ event }/>
                <View style={ styles.rightPanel }>
                    <View style={ styles.topSection }>
                        <View style={ styles.info }>
                            <EventHashtags event={ event }/>
                            <Text style={ styles.name }>
                                { event.name }
                            </Text>
                            <Days event={ event }/>
                        </View>
                    </View>
                    <EventTimeLocationRSVP event={ event } calendarDay={ calendarDay } size="small"/>
                </View>
            </View>
        </TouchableButton>
    );
};

export default compose(
    injectState
)( Item );
