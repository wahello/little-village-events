import EventDetailsDescriptionCard from "..";
import descPlusDetails from "./data/desc-plus-details.json";
import summaryPlusDesc from "./data/summary-plus-desc.json";

import { makeFullEvent } from "../../../models/event";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsDescriptionCard", module )
    .addDecorator( layout() )
    .add( "description + details", () => ( <EventDetailsDescriptionCard event={ makeFullEvent( descPlusDetails ) } /> ) )
    .add( "summary + description", () => ( <EventDetailsDescriptionCard event={ makeFullEvent( summaryPlusDesc ) } /> ) )
;
