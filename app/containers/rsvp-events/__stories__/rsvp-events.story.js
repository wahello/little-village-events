import RSVPEvents from "..";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import casual from "/.storybook/casual";

import { provideState } from "/app/utils/freactal";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { compose } from "recompose";

const ScreenProvider = ( { quantity = 30, tense = "any" } = {} ) => {
    const Screen = compose(
        provideState( {
            initialState: () => ( {
                rsvps: casual.rsvps( quantity, tense )
            } )
        } )
    )( RSVPEvents );
    return () => <Screen/>;
};

storiesOf( "RSVPEventsScreen", module )
    .addDecorator( navigatorStyleDecorator( { style: "navBarHiddenLight" } ) )
    .add( "default", ScreenProvider() )
    .add( "empty", ScreenProvider( { quantity: 0 } ) )
    .add( "future", ScreenProvider( { tense: "future" } ) )
    .add( "past", ScreenProvider( { tense: "past" } ) )
;
