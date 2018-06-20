import EventCategoriesChooser from "..";

import { injectState } from "@textpress/freactal";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";


const Story = injectState( ( { state } ) =>
    <EventCategoriesChooser
        categories={ state.Categories }
        selected={ [] }
        onChange={ action( "onChange" ) }
    />
);

storiesOf( "EventCategoriesChooser", module )
    .add( "default", () => <Story /> )
;
