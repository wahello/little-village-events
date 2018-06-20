import EventHashtags from "../event-hashtags";
import EventTimeLocationRSVP from "../event-time-location-rsvp";
import { TouchableButton } from "../touchable";
import { daysDiff, format } from "app/utils/date";

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

        backgroundColor: "#ffffff",
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


const LeftPanel = ( { eventSummary } ) => {
    const uri = imageUriBuilder( eventSummary ).resize( imageSize );
    if ( !uri )
        return <View style={ styles.leftPanel }/>;

    return (
        <Image style={ styles.leftPanel }
            source={ { uri } }
        />
    );
};


const Days = ( { eventItem } ) => {
    const { startTime, endTime } = eventItem;
    if ( !startTime || !endTime || daysDiff( endTime, startTime ) === 0 )
        return null;
    const formatStr = "MMM. D";
    const value = `${format( formatStr, startTime )} - ${format( formatStr, endTime )}`;
    return <Text style={ styles.days }>{ value }</Text>;
};


const Item = ( props ) => {
    const { item: eventItem, section: { date: calendarDay, ongoing }, effects: { navigateToEventDetails } } = props;
    const { eventSummary } = eventItem;
    // console.log( event.id );

    return (
        <TouchableButton activeOpacity={ 0.6 }
            onPress={ () => { navigateToEventDetails( eventItem, calendarDay ) } }>
            <View style={ styles.card }>
                <LeftPanel eventSummary={ eventSummary }/>
                <View style={ styles.rightPanel }>
                    <View style={ styles.topSection }>
                        <View style={ styles.info }>
                            <EventHashtags event={ eventSummary }/>
                            <Text style={ styles.name }>
                                { eventSummary.name }
                            </Text>
                            <Days eventItem={ eventItem }/>
                        </View>
                    </View>
                    <EventTimeLocationRSVP
                        eventItem={ eventItem }
                        calendarDay={ calendarDay }
                        ongoing={ ongoing }
                        size="small"
                    />
                </View>
            </View>
        </TouchableButton>
    );
};

export default compose(
    injectState
)( Item );
