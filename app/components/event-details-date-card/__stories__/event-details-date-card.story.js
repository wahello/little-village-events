import EventDetailsDateCard from "..";
import event from "./event.json";

import { makeFullEvent } from "app/models/event";
import { now, subtractFromDate } from "app/utils/date";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React from "react";

const actions = {
    addEventToCalendar: options => action( "addEventToCalendar" )( options )
};


const Screen = ( props ) => {
    return <EventDetailsDateCard { ...props } calendarDay={ new Date( props.eventItem.startTime ) } />
};


storiesOf( "EventDetailsDateCard", module )
    .addDecorator( layout() )
    .add( "default", () => ( <Screen eventItem={ makeFullEvent( event ) } { ...actions } /> ) )
    .add( "started", () => ( <Screen eventItem={ { startTime: subtractFromDate( now(), { minutes: 1 } ) } } { ...actions }/> ) )
;
