import EventListItem from "..";
import defautEvent from "./data/default.json";
import longEverythingEvent from "./data/long-everything.json";

import { makeFullEvent } from "app/models/event";
import { createEventWithDetails, getEventItem } from "app/utils/realm";
import { injectState } from "app/utils/freactal";
import { now, addToDate, subtractFromDate } from "app/utils/date";

import layout from "/.storybook/decorators/layout";
import withRealm from "/.storybook/decorators/with-realm";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import { ListView, StyleSheet } from "react-native";

import React from "react";


const styles = StyleSheet.create( {
    list: {
        marginTop: "50%",
        width: "100%"
    }
} );


const Story = injectState( ( { state, eventItemId, date = now(), ongoing = false } ) =>
    <ListView
        style={ styles.list }
        dataSource={ new ListView.DataSource( { rowHasChanged: () => true } ).cloneWithRows( [
            getEventItem( state.realm, eventItemId )
        ] ) }
        renderRow={ item =>
            <EventListItem
                item={ item }
                section={ { date, ongoing } }
                effects={ { navigateToEventDetails: action( "navigateToEventDetails" ) } }
            />
        }
    />
);


storiesOf( "EventListItem", module )
    .addDecorator( layout() )
    .addDecorator( withRealm( {
        seed: realm => {
            realm.write( () => {
                const rightNow = now();
                const inAnHour = addToDate( rightNow, { minutes: 60 } );
                const inFewHours = addToDate( rightNow, { minutes: 60 * 2 } );
                createEventWithDetails( realm, makeFullEvent( { ...defautEvent, starttime: inFewHours } ) );
                createEventWithDetails( realm, makeFullEvent( { ...longEverythingEvent, starttime: rightNow } ) );
                createEventWithDetails( realm, makeFullEvent( { ...longEverythingEvent, id: 3, starttime: inAnHour } ) );
            } );
        }
    } ) )
    .add( "default", () => ( <Story eventItemId={ "1" } /> ) )
    .add( "long everything", () => ( <Story eventItemId={ "2" } /> ) )
    .add( "upcoming", () => ( <Story eventItemId={ "3" } /> ) )
;
