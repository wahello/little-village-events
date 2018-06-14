import EventListTest from "..";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";

import React from "react";

storiesOf( "!!!EventListTest", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparent", back: true } ) )
    .add( "default", () => <EventListTest/> )
;
