import EventDetails from "..";
import event from "./event-1.json";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";
import { injectState } from "@textpress/freactal";

import React from "react";
import { compose } from "recompose";

const Screen = compose( injectState )( EventDetails );

storiesOf( "EventDetailsScreen", module )
    .addDecorator( navigatorStyleDecorator( "transparent", { back: true } ) )
    .add( "default", () => <Screen event={ event } /> )
    .add( "loading", () => <Screen event={ null }/> )
;
