import EventDetails from "..";
import lightCoverEvent from "./data/light-cover.json";
import darkCoverEvent from "./data/dark-cover.json";
import alldayEvent from "./data/allday.json";

import { makeEventFullData } from "app/models/event";
import { createEventWithDetails, toEventItem } from "app/utils/realm";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import withRealm from "/.storybook/decorators/with-realm";

import { storiesOf } from "@storybook/react-native";

import React from "react";


const Screen = ( { eventData } ) => {
    const eventItemData = toEventItem( makeEventFullData( eventData ) );
    return <EventDetails eventItemData={ eventItemData }/>
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
    .add( "default", () => <Screen eventData={ darkCoverEvent }/> )
    .add( "light cover", () => <Screen eventData={ lightCoverEvent }/> )
    .add( "allday", () => <Screen eventData={ alldayEvent }/> )
;
