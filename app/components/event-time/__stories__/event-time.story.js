import EventTime from "..";
import { dayStart, addToDate, subtractFromDate, now } from "app/utils/date";

import layout from "/.storybook/decorators/layout";

import { boolean } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react-native";

import React from "react";


const today = dayStart( now() );
const Story = ( { eventItem } ) =>
    <EventTime
        eventItem={ eventItem }
        calendarDay={ today }
        size={ boolean( "regular", false ) ? "regular" : "small" }
    />
;


storiesOf( "EventTime", module )
    .addDecorator( layout() )
    .add( "default", () => <Story eventItem={ { startTime: addToDate( now(), { minutes: 90 } ) } } /> )
    .add( "all day", () => <Story eventItem={ { startTime: now(), allDay: true } } /> )
    .add( "started", () => <Story eventItem={ { startTime: now() } } /> )
    .add( "past", () => <Story eventItem={ { startTime: subtractFromDate( now(), { minutes: 90 } ) } } /> )
;
