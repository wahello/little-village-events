import DiscoverEvents from "..";
import { createEventDetails, createEventItem, createEventSummary } from "app/utils/realm";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import withRealmSeed from "/.storybook/decorators/with-realm-seed";

import casual from "/.storybook/casual";

import { storiesOf } from "@storybook/react-native";

import React from "react";


const createEvents = ( realm, props ) => casual
    .events( props )
    .forEach( eventSummaryData => {
        createEventItem( realm, createEventSummary( realm, eventSummaryData ) );
        createEventDetails( realm, eventSummaryData.id, casual.eventDetails( eventSummaryData ) );
    } )
    ;


const ScreenProvider = ( { empty } = {} ) => {
    const Screen = withRealmSeed( ( realm, { state } ) => {
        realm.write( () => {
            realm.delete( realm.objects( "EventItem" ) );
            realm.delete( realm.objects( "EventSummary" ) );
            if ( empty )
                return;

            createEvents( realm, { quantity: 100, state, tense: "future" } );
            createEvents( realm, { quantity: 4, state, tense: "ongoing" } );
        } );

    } )( DiscoverEvents );
    return () => <Screen/>;
};


storiesOf( "DiscoverEventsScreen", module )
    .addDecorator( navigatorStyleDecorator( { style: "navBarHiddenLight" } ) )
    .add( "default", ScreenProvider() )
    .add( "empty", ScreenProvider( { empty: true } ) )
;
