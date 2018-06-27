import EventsForYouHeader from "..";

import { storiesOf } from "@storybook/react-native";

import React from "react";


storiesOf( "EventsForYouHeader", module )
    .add( "header", () =>
        <EventsForYouHeader
            timePeriod={ "This week" }
            interests={ [ "Music", "Art/Exhibition", "Theater/Performance", "Literature" ] }
            location={ "Iowa City" }
        /> )
    .add( "one interest, no location", () =>
        <EventsForYouHeader
            timePeriod={ "This weekend" }
            interests={ [ "Music" ] }
        /> )
    .add( "no interests, no location", () =>
        <EventsForYouHeader
            timePeriod={ "This week" }
            interests={ [] }
        /> )
;
