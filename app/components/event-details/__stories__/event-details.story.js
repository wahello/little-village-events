import EventDetails from "..";
import lightCoverEvent from "./data/light-cover.json";
import darkCoverEvent from "./data/dark-cover.json";

import { provideState, injectState } from "../../../utils/freactal";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { compose } from "recompose";


const Screen = compose(
    provideState( {
        initialState: ( { event } ) => ( { event } )
    } ),
    injectState
)( EventDetails );


storiesOf( "EventDetailsScreen", module )
    .addDecorator( navigatorStyleDecorator( { ...EventDetails, back: true } ) )
    .add( "default", () => <Screen event={ darkCoverEvent } /> )
    .add( "light cover", () => <Screen event={ lightCoverEvent } /> )
    .add( "loading", () => <Screen event={ null }/> )
;
