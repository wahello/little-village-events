import EventDetails from "..";
import lightCoverEvent from "./data/light-cover.json";
import darkCoverEvent from "./data/dark-cover.json";

import { makeFullEvent } from "../../../models/event";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";

import React from "react";

const Screen = ( { event } ) => {
    return <EventDetails event={ event } calendarDay={ event.startTime.clone() } />
};

storiesOf( "EventDetailsScreen", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparent", back: true } ) )
    .add( "default", () => <Screen event={ makeFullEvent( darkCoverEvent ) } /> )
    .add( "light cover", () => <Screen event={ makeFullEvent( lightCoverEvent ) } /> )
;
