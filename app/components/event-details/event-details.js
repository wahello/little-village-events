import * as Header from "../event-details-header";
import EventDetailsDateCard from "../event-details-date-card";
import EventDetailsVenueCard from "../event-details-venue-card";
import EventDetailsDescriptionCard from "../event-details-description-card";

import imageUriBuilder from "../../utils/image-uri-builder";

import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

import { ActivityIndicator, PixelRatio, StyleSheet, View } from "react-native";
import React, { Component } from "react";

const fixedHeaderHeight = 78;


const styles = StyleSheet.create( {
    loadingRoot: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "stretch",
    },
    loadingIndicatorContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingIndicator: {
        flex: 0
    },
    body: {
        backgroundColor: "#eaeaea",
        paddingTop: 6
    }
} );

const Loading = () => (
    <View style={ styles.loadingRoot }>
        <View style={ styles.loadingIndicatorContainer }>
            <ActivityIndicator style={ styles.loadingIndicator } size="large" color="black"/>
        </View>
    </View>
);

class EventDetails extends Component {
    render() {

        const { state, effects } = this.props;

        const { eventItem, eventDetails, calendarDay, windowDimensions: { width, height } } = state;
        const { eventSummary } = eventItem;

        if ( !eventItem )
            return <Loading/>;

        const headerHeight = Math.round( width * .68 );

        const imageWidth = PixelRatio.getPixelSizeForLayoutSize( width );
        const imageHeight = PixelRatio.getPixelSizeForLayoutSize( headerHeight );
        const imageUri = imageUriBuilder( eventSummary ).scale( imageWidth, imageHeight );

        return (
            <ParallaxScroll
                renderHeader={ props => <Header.Fixed event={ eventSummary } { ...props } /> }
                renderParallaxForeground={ props => <Header.Foreground
                    event={ eventSummary }
                    eventDetails={ eventDetails }
                    rsvp={ eventItem.rsvp }
                    handleRSVP={ () => effects.handleRSVP( state ) } { ...props } /> }
                renderParallaxBackground={ () => imageUri ? <Header.Background uri={ imageUri }/> : null }
                headerHeight={ fixedHeaderHeight }
                parallaxHeight={ headerHeight }
                isHeaderFixed={ true }
                useNativeDriver={ true }
                headerFixedBackgroundColor={ "transparent" }
                isBackgroundScalable={ true }
                parallaxBackgroundScrollSpeed={ 4 }
                parallaxForegroundScrollSpeed={ 1 }
            >
                <View style={ [ styles.body, { minHeight: height - headerHeight } ] }>
                    <EventDetailsDateCard eventItem={ eventItem } calendarDay={ calendarDay }
                        addEventToCalendar={ effects.addEventToCalendar }/>
                    <EventDetailsVenueCard event={ eventSummary } call={ effects.call } openMap={ effects.openMap }/>
                    <EventDetailsDescriptionCard eventDetails={ eventDetails }/>
                </View>
            </ParallaxScroll>
        );
    }
}

export default EventDetails;
