import EventDetailsCategories from "../event-details-categories"
import EventDetailsTitle from "../event-details-title"

import * as Styles from "../../styles";

import React from "react";
import { View } from "react-native";


const styles = Styles.create( {
    root: {
        flexDirection: "column",
        alignItems: "stretch"
    },
    categories: {
        flex: 0,
    },
} );

const Title = ( { event } ) => (
    <View style={ styles.root }>
        <EventDetailsCategories style={ styles.categories } event={ event }/>
        <EventDetailsTitle event={ event }/>
    </View>
);

export default Title;
