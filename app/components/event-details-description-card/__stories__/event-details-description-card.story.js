import EventDetailsDescriptionCard from "..";
import descPlusDetails from "./data/desc-plus-details.json";
import summaryPlusDesc from "./data/summary-plus-desc.json";

import { makeEventFullData } from "app/models/event";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


const eventDetails = event => makeEventFullData( event ).details;


storiesOf( "EventDetailsDescriptionCard", module )
    .addDecorator( layout() )
    .add( "description + details", () => ( <EventDetailsDescriptionCard eventDetails={ eventDetails( descPlusDetails ) } /> ) )
    .add( "summary + description", () => ( <EventDetailsDescriptionCard eventDetails={ eventDetails( summaryPlusDesc ) } /> ) )
;
