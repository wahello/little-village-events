import EventDetailsButton from "..";
import { CalendarIcon } from "../../icons";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import React, { Fragment } from "react";
import { Text } from "react-native";

const CustomLabel = ( { style, label } ) => (
    <Fragment>
        <CalendarIcon/>
        <Text style={ style }>{ label }</Text>
    </Fragment>

);

storiesOf( "EventDetailsButton", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "text label", () => (<EventDetailsButton label={ "Directions" } onPress={ action( "onPress" ) }/>) )
    .add( "custom style", () => (
        <EventDetailsButton label={ "Directions" }
            onPress={ action( "onPress" ) }
            style={ {
                button: { backgroundColor: "red" },
                label: { color: "blue" }
            } }
        />
    ) )
    .add( "custom label", () => (
        <EventDetailsButton label={ "Directions" }
            renderLabel={ CustomLabel }
            onPress={ action( "onPress" ) }
            style={ {
                button: { maxHeight: null, flex: 0, paddingLeft: 17, paddingVertical: 5 },
                label: { color: "blue" }
            } }
        />
    ) )
;
