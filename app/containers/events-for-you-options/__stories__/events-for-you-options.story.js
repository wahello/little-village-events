import EventsForYouOptions from "..";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";

import { storiesOf } from "@storybook/react-native";

import React from "react";


const navigator = {
    setOnNavigatorEvent() {}
};

storiesOf( "EventsForYouOptions", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparentLight", back: true } ) )
    .add( "default", () => <EventsForYouOptions navigator={ navigator }/> )
;
