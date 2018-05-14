import EventDetailsDescriptionCard from "..";
import event from "./event.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsDescriptionCard", module )
    .addDecorator( layout() )
    .add( "default", () => ( <EventDetailsDescriptionCard event={event} /> ) )
;
