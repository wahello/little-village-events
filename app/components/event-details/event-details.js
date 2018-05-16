import * as Header from "../event-details-header";
import EventDetailsDateCard from "../event-details-date-card";
import EventDetailsVenueCard from "../event-details-venue-card";
import EventDetailsDescriptionCard from "../event-details-description-card";
import { eventImage } from "../../utils/event";

import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

import { ActivityIndicator, PixelRatio, StyleSheet, View } from "react-native";
import React from "react";

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

const EventDetails = ( { state, effects } ) => {
    const { event, windowDimensions: { width, height } } = state;

    if ( !event )
        return <Loading/>;

    const headerHeight = Math.round( width * .68 );

    const image = eventImage( event );
    if ( !image )
        return null;

    const imageWidth = PixelRatio.getPixelSizeForLayoutSize( width );
    const imageHeight = PixelRatio.getPixelSizeForLayoutSize( headerHeight );
    const uri = `${image}-/scale_crop/${imageWidth}x${imageHeight}/center/-/enhance/`;

    return (
        <ParallaxScroll
            renderHeader={ props => <Header.Fixed event={ event } {...props} /> }
            renderParallaxForeground={ props => <Header.Foreground event={ event } {...props} /> }
            renderParallaxBackground={ () => <Header.Background uri={ uri } /> }
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
                <EventDetailsDateCard event={ event }/>
                <EventDetailsVenueCard event={ event } call={ effects.call } openMap={ effects.openMap }/>
                <EventDetailsDescriptionCard event={ event }/>
            </View>
        </ParallaxScroll>
    );
};


export default EventDetails;
