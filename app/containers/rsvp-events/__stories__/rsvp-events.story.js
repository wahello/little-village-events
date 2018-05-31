import RSVPEvents from "..";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import casual from "/.storybook/casual";

import { provideState } from "/app/utils/freactal";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { compose } from "recompose";

const ScreenProvider = ( tense ) => {
    const Screen = compose(
        provideState( {
            initialState: () => ( {
                rsvps: casual.rsvps( 15, tense )
            } )
        } )
    )( RSVPEvents );
    return () => <Screen/>;
};

storiesOf( "RSVPEventsScreen", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparentDark" } ) )
    .add( "future", ScreenProvider( "future" ) )
    .add( "past", ScreenProvider( "past" ) )
;
