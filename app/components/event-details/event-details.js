import * as Header from "../../components/event-details-header";
import EventDetailsDateCard from "../../components/event-details-date-card";
import { eventImage } from "../../utils/event";

import React from "react";
import { View, PixelRatio, StyleSheet } from "react-native";
import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

const styles = StyleSheet.create( {
    body: {
        backgroundColor: "#eaeaea",
        minHeight: 1000
    }
} );


const EventDetails = ( { event, state } ) => {
    const { windowDimensions: { width } } = state;
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
                    animatedValue={animatedValue}
                />
            ) }
            renderParallaxBackground={ () => <Header.Background uri={ uri } /> }
            headerHeight={ headerHeight }
            parallaxHeight={ headerHeight }
            isHeaderFixed={ true }
            useNativeDriver={ true }
            headerFixedBackgroundColor={ "transparent" }
            isBackgroundScalable={ true }
            parallaxBackgroundScrollSpeed={ 4 }
        >
            <View style={ styles.body }>
                <EventDetailsDateCard event={event} />
            </View>
        </ParallaxScroll>
    );
};


export default EventDetails;
