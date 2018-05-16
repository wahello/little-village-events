import EventDetailsDateCard from "..";
import event from "./event.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React from "react";
import moment from "moment";

const actions = {
    addEventToCalendar: options => action( "addEventToCalendar" )( options )
};

storiesOf( "EventDetailsDateCard", module )
    .addDecorator( layout() )
    .add( "default", () => ( <EventDetailsDateCard event={ event } { ...actions } /> ) )
    .add( "started", () => ( <EventDetailsDateCard event={ { starttime: moment().subtract( { minutes: 1 } ).toISOString() } } { ...actions }/> ) )
;
