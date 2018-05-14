import EventDetailsDescriptionCard from "..";
import descPlusDetails from "./data/desc-plus-details.json";
import summaryPlusDesc from "./data/summary-plus-desc.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsDescriptionCard", module )
    .addDecorator( layout() )
    .add( "description + details", () => ( <EventDetailsDescriptionCard event={descPlusDetails} /> ) )
    .add( "summary + description", () => ( <EventDetailsDescriptionCard event={summaryPlusDesc} /> ) )
;
