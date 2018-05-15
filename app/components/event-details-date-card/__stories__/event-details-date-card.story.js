import EventDetailsDateCard from "..";
import event from "./event.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";

import moment from "moment";


storiesOf( "EventDetailsDateCard", module )
    .addDecorator( layout() )
    .add( "default", () => ( <EventDetailsDateCard event={ event }/> ) )
    .add( "started", () => ( <EventDetailsDateCard event={ { starttime: moment().subtract( { minutes: 1 } ).toISOString() } }/> ) )
;



//
// var now = "2018-05-14T08:00:00.000Z";
//
// var start = "2018-05-14T02:00:00.000Z";
//
//
//
// var midnight = "2018-05-14T05:00:00.000Z";
//
//






