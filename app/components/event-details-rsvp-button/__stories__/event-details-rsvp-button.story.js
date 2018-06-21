import EventDetailsRsvpButton from "..";
import cinemaEvent from "./data/cinema-event.json";
import oneDollarEvent from "./data/one-dollar-event.json";
import priceyEvent from "./data/pricey-event.json";
import freeEvent from "./data/free-event.json";

import { makeFullEvent } from "app/models/event";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React from "react";


const eventDetails = event => makeFullEvent( event ).details;


const actions = {
    handleRSVP: args => action( "handleRSVP" )( args )
};


storiesOf( "EventDetailsRsvpButton", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "default", () => ( <EventDetailsRsvpButton eventDetails={ eventDetails( cinemaEvent ) } { ...actions } /> ) )
    .add( "$1 price", () => ( <EventDetailsRsvpButton eventDetails={ eventDetails( oneDollarEvent ) } { ...actions } /> ) )
    .add( "large price", () => ( <EventDetailsRsvpButton eventDetails={ eventDetails( priceyEvent ) } { ...actions } /> ) )
    .add( "free", () => ( <EventDetailsRsvpButton eventDetails={ eventDetails( freeEvent ) } { ...actions } /> ) )
    .add( "going", () => ( <EventDetailsRsvpButton rsvp={true} eventDetails={ eventDetails( freeEvent ) } { ...actions } /> ) )
;
