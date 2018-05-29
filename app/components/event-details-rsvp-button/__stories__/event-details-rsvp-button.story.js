import EventDetailsRsvpButton from "..";
import cinemaEvent from "./data/cinema-event.json";
import oneDollarEvent from "./data/one-dollar-event.json";
import priceyEvent from "./data/pricey-event.json";
import freeEvent from "./data/free-event.json";

import { makeFullEvent } from "../../../models/event";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React from "react";

const actions = {
    handleRSVP: args => action( "handleRSVP" )( args )
};


storiesOf( "EventDetailsRsvpButton", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "default", () => ( <EventDetailsRsvpButton event={ makeFullEvent( cinemaEvent ) } { ...actions } /> ) )
    .add( "$1 price", () => ( <EventDetailsRsvpButton event={ makeFullEvent( oneDollarEvent ) } { ...actions } /> ) )
    .add( "large price", () => ( <EventDetailsRsvpButton event={ makeFullEvent( priceyEvent ) } { ...actions } /> ) )
    .add( "free", () => ( <EventDetailsRsvpButton event={ makeFullEvent( freeEvent ) } { ...actions } /> ) )
    .add( "going", () => ( <EventDetailsRsvpButton event={ { ...makeFullEvent( freeEvent ), rsvp: true } } { ...actions } /> ) )
;
