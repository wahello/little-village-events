import CalendarIcon from "../calendar";

import { StyleSheet } from "react-native";

import layout from "/.storybook/decorators/layout";

import { number, color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "Icons", module )
    .addDecorator( layout() )
    .add( "style", () => <CalendarIcon
        style={ { width: number( "width", 38 ), height: number( "height", 38 ) } }
        fill={ color( "color", "black" ) } /> )
    .add( "atrributes", () => <CalendarIcon
        width={ number( "width", 38 ) } height={ number( "height", 38 ) }
        fill={ color( "color", "black" ) } /> )
    .add( "stylesheet", () => <CalendarIcon
        style={ StyleSheet.create( { icon: {
            width: number( "width", 38 ),
            height: number( "height", 38 )
        } } ).icon }
        fill={ color( "color", "black" ) } /> )
;
