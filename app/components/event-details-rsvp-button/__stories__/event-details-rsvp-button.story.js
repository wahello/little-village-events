import EventDetailsRsvpButton from "..";
import cinemaEvent from "./data/cinema-event.json";
import oneDollarEvent from "./data/one-dollar-event.json";
import priceyEvent from "./data/pricey-event.json";
import freeEvent from "./data/free-event.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React from "react";

const actions = {
    openWebPage: args => action( "openWebPage" )( args )
};


storiesOf( "EventDetailsRsvpButton", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "default", () => ( <EventDetailsRsvpButton event={ cinemaEvent } { ...actions } /> ) )
    .add( "$1 price", () => ( <EventDetailsRsvpButton event={ oneDollarEvent } { ...actions } /> ) )
    .add( "large price", () => ( <EventDetailsRsvpButton event={ priceyEvent } { ...actions } /> ) )
    .add( "free", () => ( <EventDetailsRsvpButton event={ freeEvent } { ...actions } /> ) )
;
