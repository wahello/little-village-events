import FeatureItem from "..";
import lightCoverEvent from "./data/light-cover.json";
import darkCoverEvent from "./data/dark-cover.json";

import { makeEventSummaryData } from "app/models/event";
import { toEventItem } from "app/utils/realm";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { ListView, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    list: {
        marginTop: 20,
        width: "100%"
    }
} );

const Screen = ( { eventItem } ) => (
    <ListView
        style={ styles.list }
        dataSource={ new ListView.DataSource( { rowHasChanged: () => true } ).cloneWithRows( [ eventItem ] ) }
        renderRow={
            eventItem => <FeatureItem item={ eventItem } section={ { date: eventItem.startTime } }/>
        }
    />
);

storiesOf( "EventListFeaturedItem", module )
    .addDecorator( layout( { theme: "light" } ) )
    .add( "default", () => <Screen eventItem={ { ...toEventItem( makeEventSummaryData( darkCoverEvent ) ), rsvp: true } } /> )
    .add( "light cover", () => <Screen eventItem={ { ...toEventItem( makeEventSummaryData( lightCoverEvent ) ), rsvp: true } } /> )
    .add( "not rsvp-ed", () => <Screen eventItem={ toEventItem( makeEventSummaryData( darkCoverEvent ) ) } /> )
;
