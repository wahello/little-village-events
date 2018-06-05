import Banner from "./event-list-featured-item.banner";
import EventTimeLocationRSVP from "../event-time-location-rsvp";

import { TouchableButton } from "../touchable";

import * as Styles from "../../styles";

import { injectState } from "@textpress/freactal";

import React from "react";
import { View } from "react-native";
import { compose } from "recompose";

const styles = Styles.create( {
    card: {
        flexDirection: "column",
        alignContent: "stretch",

        padding: Styles.variables.marginHorizontal,

        borderRadius: 10
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginTop: 2

    }

} );

const FeaturedItem = ( { item: event, section: { date: calendarDay }, effects: { navigateToEventDetails }, state: { windowDimensions } } ) => (
    <TouchableButton activeOpacity={ 0.6 }
        onPress={ () => navigateToEventDetails( event ) }>
        <View style={ styles.card }>
            <Banner event={ event } windowDimensions={ windowDimensions }/>
            <View style={ styles.bottomBar }>
                <EventTimeLocationRSVP event={ event } calendarDay={ calendarDay } size="regular"/>
            </View>
        </View>
    </TouchableButton>
);

export default compose(
    injectState
)( FeaturedItem );