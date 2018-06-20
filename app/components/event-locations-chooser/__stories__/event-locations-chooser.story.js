import EventLocationsChooser from "..";

import { injectState } from "@textpress/freactal";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";


const Story = injectState( ( { state } ) =>
    <EventLocationsChooser
        locations={ state.Locations }
        selected={ null }
        onChange={ action( "onChange" ) }
    />
);


storiesOf( "EventLocationsChooser", module )
    .add( "default", () => <Story /> )
;
