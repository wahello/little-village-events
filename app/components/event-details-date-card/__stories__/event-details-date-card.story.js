import EventDetailsDateCard from "..";
import event from "./event.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsDateCard", module )
    .addDecorator( layout() )
    .add( "default", () => ( <EventDetailsDateCard event={event} /> ) )
;
