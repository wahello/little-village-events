import { eventImage } from "/app/utils/event";

import { injectState } from "@textpress/freactal";

import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { compose } from "recompose";


const Hero = ( { event, state } ) => {
    const image = eventImage( event );
    if ( !image )
        return null;

    const { windowDimensions: { width } } = state;
    const height = Math.trunc( width / 1.85 );


    const styles = StyleSheet.create( {
        image: {
            width,
            height
        }
    } );

    const uri = `${image}-/scale_crop/${width}x${height}/center/`;
    return <Image style={ styles.image } source={ { uri } }/>;
};

const EventDetails = ( { event, state } ) => (
    <View>
        <Hero event={event} state={state}/>
        <Text>{ event.name }</Text>
    </View>
);

export default compose(
    injectState
)( EventDetails );
