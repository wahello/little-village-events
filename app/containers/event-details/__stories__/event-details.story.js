import EventDetails from "..";
import lightCoverEvent from "./data/light-cover.json";
import darkCoverEvent from "./data/dark-cover.json";

import { makeFullEvent } from "../../../models/event";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";

import React from "react";

storiesOf( "EventDetailsScreen", module )
    .addDecorator( navigatorStyleDecorator( { ...EventDetails, back: true } ) )
    .add( "default", () => <EventDetails event={ makeFullEvent( darkCoverEvent ) } /> )
    .add( "light cover", () => <EventDetails event={ makeFullEvent( lightCoverEvent ) } /> )
;
