import * as Header from "../event-details-header";
import EventDetailsDateCard from "../event-details-date-card";
import EventDetailsVenueCard from "../event-details-venue-card";
import { eventImage } from "../../utils/event";

import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

import React from "react";
import { ActivityIndicator, PixelRatio, StyleSheet, View } from "react-native";

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
        minHeight: 1000
    }
} );

const Loading = () => (
    <View style={ styles.loadingRoot }>
        <View style={ styles.loadingIndicatorContainer }>
            <ActivityIndicator style={ styles.loadingIndicator } size="large" color="black"/>
        </View>
    </View>
);

const EventDetails = ( { state, effects } ) => {
    const { event, windowDimensions: { width } } = state;

    if ( !event )
        return <Loading/>;

    const headerHeight = Math.round( width * .68 );

    const image = eventImage( event );
    if ( !image )
        return null;

    const imageWidth = PixelRatio.getPixelSizeForLayoutSize( width );
    const imageHeight = PixelRatio.getPixelSizeForLayoutSize( headerHeight );
    const uri = `${image}-/scale_crop/${imageWidth}x${imageHeight}/center/`;

    return (
        <ParallaxScroll
            style={ {} }
            renderHeader={ ( { height, animatedValue } ) => (
                <Header.Content
                    event={ event }
                    height={ height }
                    animatedValue={ animatedValue }
                />
            ) }
            renderParallaxBackground={ () => <Header.Background uri={ uri }/> }
            headerHeight={ headerHeight }
            parallaxHeight={ headerHeight }
            isHeaderFixed={ true }
            useNativeDriver={ true }
            headerFixedBackgroundColor={ "transparent" }
            isBackgroundScalable={ true }
            parallaxBackgroundScrollSpeed={ 4 }
        >
            <View style={ styles.body }>
                <EventDetailsDateCard event={ event }/>
                <EventDetailsVenueCard event={ event } call={ effects.call }/>
            </View>
        </ParallaxScroll>
    );
};


export default EventDetails;
