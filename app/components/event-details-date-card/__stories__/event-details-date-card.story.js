import EventDetailsDateCard from "..";
import event from "./event.json";

import { makeFullEvent } from "../../../models/event";

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
    .add( "default", () => ( <EventDetailsDateCard event={ makeFullEvent( event ) } { ...actions } /> ) )
    .add( "started", () => ( <EventDetailsDateCard event={ { startTime: moment().subtract( { minutes: 1 } ) } } { ...actions }/> ) )
;
