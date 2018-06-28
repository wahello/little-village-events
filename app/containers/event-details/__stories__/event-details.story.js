import EventDetails from "..";
import lightCoverEvent from "./data/light-cover.json";
import darkCoverEvent from "./data/dark-cover.json";
import alldayEvent from "./data/allday.json";

import { createEventWithDetails } from "app/utils/realm";
import { makeEventFullData } from "app/models/event";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import withRealm from "/.storybook/decorators/with-realm";

import { storiesOf } from "@storybook/react-native";

import React from "react";


const Screen = ( { event } ) => {
    return <EventDetails eventItemId={ `${event.id}` } calendarDay={ new Date( event.startTime ) } />
};


storiesOf( "EventDetailsScreen", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparent", back: true } ) )
    .addDecorator( withRealm( {
        seed: realm => {
            realm.write( () => {
                createEventWithDetails( realm, makeEventFullData( darkCoverEvent ) );
                createEventWithDetails( realm, makeEventFullData( lightCoverEvent ) );
                createEventWithDetails( realm, makeEventFullData( alldayEvent ) );
            } );
        }
    } ) )
    .add( "default", () => <Screen event={ darkCoverEvent } /> )
    .add( "light cover", () => <Screen event={ lightCoverEvent } /> )
    .add( "allday", () => <Screen event={ alldayEvent } /> )
;
