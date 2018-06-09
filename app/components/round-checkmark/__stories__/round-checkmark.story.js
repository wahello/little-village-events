import RoundCheckmark from "..";

import layout from "/.storybook/decorators/layout";

import { boolean, number, color } from "@storybook/addon-knobs";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "RoundCheckmark", module )
    .addDecorator( layout() )
    .add( "default", () => (
        <RoundCheckmark checked={ boolean( "checked", true ) } />
    ) )
    .add( "custom", () => (
        <RoundCheckmark
            checked={ boolean( "checked", true ) }
            size={ number( "size", 40 ) }
            style={{
                backgroundColor: color( "backgroundColor", "red" ) 
            }}
        />
    ) )
;
