import EventDetailsRsvpButton from "..";
import cinemaEvent from "./data/cinema-event.json";
import oneDollarEvent from "./data/one-dollar-event.json";
import priceyEvent from "./data/pricey-event.json";
import freeEvent from "./data/free-event.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsRsvpButton", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "default", () => ( <EventDetailsRsvpButton event={cinemaEvent} /> ) )
    .add( "$1 price", () => ( <EventDetailsRsvpButton event={oneDollarEvent} /> ) )
    .add( "large price", () => ( <EventDetailsRsvpButton event={priceyEvent} /> ) )
    .add( "free", () => ( <EventDetailsRsvpButton event={freeEvent} /> ) )
;
