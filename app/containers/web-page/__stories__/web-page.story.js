import WebPage from "..";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { injectState } from "../../../utils/freactal";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { compose } from "recompose";

const Screen = compose(
    injectState
)( WebPage );

storiesOf( "WebPage", module )
    .addDecorator( navigatorStyleDecorator( { ...WebPage, back: true } ) )
    .add( "default", () => ( <Screen source={ { uri: "https://google.com" } } /> ) )
;
