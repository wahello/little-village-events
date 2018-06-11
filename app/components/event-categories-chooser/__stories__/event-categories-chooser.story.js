import EventCategoriesChooser from "..";
import Categories from "../../../models/categories";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";


storiesOf( "EventCategoriesChooser", module )
    .add( "default", () => ( <EventCategoriesChooser
        categories={ Categories }
        selected={ [] }
        onChange={ action( "onChange" ) }
    /> ) )
;
