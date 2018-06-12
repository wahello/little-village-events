import EventLocationsChooser from "..";
import Locations from "../../../models/locations";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";


storiesOf( "EventLocationsChooser", module )
    .add( "default", () => ( <EventLocationsChooser
        locations={ Locations }
        selected={ null }
        onChange={ action( "onChange" ) }
    /> ) )
;
