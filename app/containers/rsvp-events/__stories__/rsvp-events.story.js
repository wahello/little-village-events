import RSVPEvents from "..";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import casual from "/.storybook/casual";

import { provideState } from "/app/utils/freactal";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { compose } from "recompose";

const generateRSVPs = quantity => {
    if ( !quantity )
        return {};

    return {
        ...casual.rsvps( 1, "upcoming" ),
        ...casual.rsvps( quantity - 1, "any" )
    };
};

const ScreenProvider = ( { quantity = 30 } = {} ) => {
    const Screen = compose(
        provideState( {
            initialState: () => ( {
                rsvps: generateRSVPs( quantity )
            } )
        } )
    )( RSVPEvents );
    return () => <Screen/>;
};

storiesOf( "RSVPEventsScreen", module )
    .addDecorator( navigatorStyleDecorator( { style: "navBarHiddenLight" } ) )
    .add( "default", ScreenProvider() )
    .add( "empty", ScreenProvider( { quantity: 0 } ) )
;
