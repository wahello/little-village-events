import RSVPEvents from "..";

import { createRsvpedEventItem } from "app/utils/realm";
import { injectState, provideState } from "/app/utils/freactal";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import withRealm from "/.storybook/decorators/with-realm";
import casual from "/.storybook/casual";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { compose } from "recompose";

const generateRSVPs = ( quantity, state ) => {
    if ( !quantity )
        return [];

    return [
        ...casual.rsvps( { quantity: 1, tense: "upcoming", state } ),
        ...casual.rsvps( { quantity: quantity - 1, tense: "any", state } )
    ];
};

const ScreenProvider = ( { quantity = 30 } = {} ) => {
    const Screen = compose(
        injectState,
        provideState( {
            initialState: ( { state } ) => {
                const { realm } = state;
                realm.write( () => {
                    generateRSVPs( quantity, state ).forEach( rsvp => createRsvpedEventItem(
                        realm,
                        rsvp.eventSummary,
                        { startTime: rsvp.startTime, endTime: rsvp.endTime }
                    ) );
                } );

            }
        } )
    )( RSVPEvents );
    return () => <Screen/>;
};

storiesOf( "RSVPEventsScreen", module )
    .addDecorator( navigatorStyleDecorator( { style: "navBarHiddenLight" } ) )
    .addDecorator( withRealm( {} ) )
    .add( "default", ScreenProvider() )
    .add( "empty", ScreenProvider( { quantity: 0 } ) )
;
