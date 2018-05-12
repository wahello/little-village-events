import EventDetails from "..";
import event from "./event-1.json";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";

import React from "react";


storiesOf( "EventDetailsScreen", module )
    .addDecorator( navigatorStyleDecorator( "transparent", { back: true } ) )
    .add( "default", () => ( <EventDetails event={ event } /> ) )
;
