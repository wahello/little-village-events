import EventDetailsIconCard from "..";
import EventDetailsButton from "../../event-details-button";
import CalendarIcon from "../../icons/calendar";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs"

import React from "react";
import { Text } from "react-native";
import casual from "casual-browserify";

const sentence = casual.sentence;

storiesOf( "EventDetailsIconCard", module )
    .addDecorator( withKnobs )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "default", () => (
        <EventDetailsIconCard
            renderIcon={ CalendarIcon }
            renderButton={ ( props ) => <EventDetailsButton { ...props } label={ text( "Button title", "A button" ) }/> }
        >
            <Text>{ text( "Text", sentence ) }</Text>
        </EventDetailsIconCard>
    ) )
    .add( "without icon", () => (
        <EventDetailsIconCard
            renderButton={ ( props ) => <EventDetailsButton { ...props } label={ text( "Button title", "A button" ) }/> }
        >
            <Text>{ text( "Text", sentence ) }</Text>
        </EventDetailsIconCard>
    ) )
    .add( "without button", () => (
        <EventDetailsIconCard
            renderIcon={ CalendarIcon }
        >
            <Text>{ text( "Text", sentence ) }</Text>
        </EventDetailsIconCard>
    ) )
    .add( "without icon and button", () => (
        <EventDetailsIconCard>
            <Text>{ text( "Text", sentence ) }</Text>
        </EventDetailsIconCard>
    ) )
;
