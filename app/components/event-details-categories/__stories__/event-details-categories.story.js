import EventDetailsCategories from "..";
import oneCategory from "./data/one-category.json";
import twoCategories from "./data/two-categories.json";
import twoLongCategories from "./data/two-long-categories.json";
import threeCategories from "./data/three-categories.json";
import fiveCategories from "./data/five-categories.json";

import layout from "/.storybook/decorators/layout";

import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "EventDetailsCategories", module )
    .addDecorator( layout( { theme: "black" } ) )
    .add( "one category", () => ( <EventDetailsCategories event={oneCategory} /> ) )
    .add( "two categories", () => ( <EventDetailsCategories event={twoCategories} /> ) )
    .add( "two long categories", () => ( <EventDetailsCategories event={twoLongCategories} /> ) )
    .add( "three categories", () => ( <EventDetailsCategories event={threeCategories} /> ) )
    .add( "five categories (truncated)", () => ( <EventDetailsCategories event={fiveCategories} /> ) )
;
