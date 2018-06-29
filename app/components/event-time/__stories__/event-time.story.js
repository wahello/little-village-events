import EventTime from "..";
import { addToDate, now, subtractFromDate } from "app/utils/date";
import { toEventItem } from "app/utils/realm";

import layout from "/.storybook/decorators/layout";

import { boolean } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react-native";

import React from "react";

const Story = ( { eventSummary } ) =>
    <EventTime
        eventItem={ toEventItem( eventSummary ) }
        size={ boolean( "regular", false ) ? "regular" : "small" }
    />
;


storiesOf( "EventTime", module )
    .addDecorator( layout() )
    .add( "default", () => <Story eventSummary={ { startTime: addToDate( now(), { minutes: 90 } ) } }/> )
    .add( "all day", () => <Story eventSummary={ { startTime: now(), allDay: true } }/> )
    .add( "started", () => <Story eventSummary={ { startTime: now() } }/> )
    .add( "past", () => <Story eventSummary={ { startTime: subtractFromDate( now(), { minutes: 90 } ) } }/> )
;
