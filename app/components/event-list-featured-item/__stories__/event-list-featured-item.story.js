import FeatureItem from "..";
import lightCoverEvent from "./data/light-cover.json";
import darkCoverEvent from "./data/dark-cover.json";

import { makeSummaryEvent } from "../../../models/event";

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

const Screen = ( { event } ) => (
    <ListView
        style={ styles.list }
        dataSource={ new ListView.DataSource( { rowHasChanged: () => true } ).cloneWithRows( [ event ] ) }
        renderRow={
            item => <FeatureItem item={ item } section={ { date: event.startTime.clone() } }/>
        }
    />
);

storiesOf( "EventListFeaturedItem", module )
    .addDecorator( layout( { theme: "light" } ) )
    .add( "default", () => <Screen event={ { ...makeSummaryEvent( darkCoverEvent ), rsvp: true } } /> )
    .add( "light cover", () => <Screen event={ makeSummaryEvent( lightCoverEvent ) } /> )
;
