import EventDetailsCategories from "..";
import oneCategory from "./data/one-category.json";
import twoCategories from "./data/two-categories.json";
import twoLongCategories from "./data/two-long-categories.json";
import threeCategories from "./data/three-categories.json";
import fiveCategories from "./data/five-categories.json";

import { makeEventFullData } from "../../../models/event";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsCategories", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "one category", () => ( <EventDetailsCategories event={ makeEventFullData( oneCategory ) } /> ) )
    .add( "two categories", () => ( <EventDetailsCategories event={ makeEventFullData( twoCategories ) } /> ) )
    .add( "two long categories", () => ( <EventDetailsCategories event={ makeEventFullData( twoLongCategories ) } /> ) )
    .add( "three categories", () => ( <EventDetailsCategories event={ makeEventFullData( threeCategories ) } /> ) )
    .add( "five categories (truncated)", () => ( <EventDetailsCategories event={ makeEventFullData( fiveCategories ) } /> ) )
;
