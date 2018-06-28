import rescindRSVPActionSheet from "../rescind-rsvp";
import StoryScreen from "./story-screen";

import { toEventItem } from "app/utils/realm";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import casual from "/.storybook/casual/index";

import { storiesOf } from "@storybook/react-native";

import React from "react";

const actionSheetFactory = ( props ) => {
    const eventSummary = casual.eventSummary( props );
    const eventItem = toEventItem( eventSummary );
    return rescindRSVPActionSheet( { eventSummary, eventItem } );
};


storiesOf( "Rescind RSVP Action Sheet", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparent", back: true } ) )
    .add( "default", () => <StoryScreen
        actionSheetFactory={ actionSheetFactory }
        tense={ "future" }
        allDay={ false }
    /> );
