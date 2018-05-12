import * as Header from "../../components/event-details-header";
import { eventImage } from "../../utils/event";

import { injectState } from "@textpress/freactal";

import React from "react";
import { ScrollView, Text } from "react-native";
import ParallaxScroll from "@monterosa/react-native-parallax-scroll";
import { compose } from "recompose";


const EventDetails = ( { event, state } ) => {
    const { windowDimensions: { width } } = state;
    const height = Math.trunc( width / 1.85 );

    const image = eventImage( event );
    if ( !image )
        return null;

    const uri = `${image}-/scale_crop/${width}x${height}/center/`;

    return (
        <ParallaxScroll
            style={ {} }
            renderHeader={ ( { height, animatedValue } ) => (
                <Header.Content
                    height={ height }
                    // animatedValue={animatedValue}
                />
            ) }
            renderParallaxBackground={ () => (
                <Header.Background
                    uri={ uri }
                    // animatedValue={animatedValue}
                />
            ) }
            headerHeight={ height }
            isHeaderFixed={ true }
            useNativeDriver={ true }
            isBackgroundScalable={ true }
            headerBackgroundColor={ "green" }
            headerFixedBackgroundColor={ "red" }
            headerFixedTransformY={ height - 60 }
            fadeOutParallaxBackground={ true }
            fadeOutParallaxForeground={ false }
            parallaxBackgroundScrollSpeed={ 1 }
            parallaxForegroundScrollSpeed={ 1 }
        >
            <Text>{ event.name }</Text>
        </ParallaxScroll>
    );
};


export default compose(
    injectState
)( EventDetails );
