import addRSVPActionSheet from "../add-rsvp";
import StoryScreen from "./story-screen";

import { toEventItem } from "app/utils/realm";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import casual from "/.storybook/casual/index";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React from "react";

const actionSheetFactory = ( props ) => {
    const eventSummary = casual.eventSummaryObject( props );
    const eventItem = toEventItem( eventSummary );
    return addRSVPActionSheet( { eventSummary, eventItem, openWebBrowser: action( "openWebBrowser" ) } );
};


storiesOf( "Add RSVP Action Sheet", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparent", back: true } ) )
    .add( "default", () => <StoryScreen
        actionSheetFactory={ actionSheetFactory }
        tense={ "future" }
        allDay={ false }
    /> )
    .add( "all day", () => <StoryScreen
        actionSheetFactory={ actionSheetFactory }
        tense={ "future" }
        allDay={ true }
    /> )
    .add( "all day today", () => <StoryScreen
        actionSheetFactory={ actionSheetFactory }
        tense={ "today" }
        allDay={ true }
    /> )
    .add( "ongoing", () => <StoryScreen
        actionSheetFactory={ actionSheetFactory }
        tense={ "ongoing" }
        allDay={ false }
    /> )
    .add( "ongoing all day", () => <StoryScreen
        actionSheetFactory={ actionSheetFactory }
        tense={ "ongoing" }
        allDay={ true }
    /> )
;
