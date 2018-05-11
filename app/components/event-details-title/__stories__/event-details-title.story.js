import EventDetailsTitle from "..";
import shortTile from "./data/short-title.json";
import longTile from "./data/long-title.json";
import extraLongTile from "./data/extra-long-title.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsTitle", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "short title", () => ( <EventDetailsTitle event={shortTile} /> ) )
    .add( "long title", () => ( <EventDetailsTitle event={longTile} /> ) )
    .add( "extra long title", () => ( <EventDetailsTitle event={extraLongTile} /> ) )
;
