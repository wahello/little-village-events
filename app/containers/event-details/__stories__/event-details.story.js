import EventDetails from "..";
import event from "./event-1.json";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";

import casual from "casual-browserify";
import React from "react";

storiesOf( "EventDetailsScreen", module )
    .addDecorator( navigatorStyleDecorator( "transparent" ) )
    .add( "default", () => ( <EventDetails event={ { ...event, name: casual.sentences( 60 ) } }/> ) )
;
