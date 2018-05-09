import Header from "/app/components/event-details-header";
import { eventImage } from "/app/utils/event";

import { injectState } from "@textpress/freactal";

import React from "react";
import { ScrollView, Text } from "react-native";
import { compose } from "recompose";


const EventDetails = ( { event, state } ) => {
    const { windowDimensions: { width } } = state;
    const height = Math.trunc( width / 1.85 );

    const image = eventImage( event );
    if ( !image )
        return null;

    const uri = `${image}-/scale_crop/${width}x${height}/center/`;

    return (
        <ScrollView>
            <Header height={ height } width={width} uri={uri}/>
            <Text>{ event.name }</Text>
        </ScrollView>
    );
};

export default compose(
    injectState
)( EventDetails );
