import EventDetailsVenueCard, { VenueCard } from "../event-details-venue-card";
import completeEvent from "./data/complete-event.json";
import complexAddress from "./data/complex-address.json";
import longVenueName from "./data/long-venue-name.json";
import noAddress from "./data/no-address.json";
import noDirections from "./data/no-directions.json";
import noName from "./data/no-name.json";
import noNameAndPhone from "./data/no-name-and-phone.json";
import noPhone from "./data/no-phone.json";

import { makeFullEvent } from "../../../models/event";

import layout from "/.storybook/decorators/layout";

import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

const actions = {
    call: number => action( "call" )( number ),
    openMap: options => action( "openMap" )( options )
};

storiesOf( "EventDetailsVenueCard", module )
    .addDecorator( layout() )
    .add( "complete", () => ( <EventDetailsVenueCard event={ makeFullEvent( completeEvent ) } { ...actions } /> ) )
    .add( "no venue", () => ( <EventDetailsVenueCard event={ {} } { ...actions }/> ) )
    .add( "complex address", () => ( <VenueCard venue={ complexAddress } { ...actions }/> ) )
    .add( "long venue name", () => ( <VenueCard venue={ longVenueName } { ...actions }/> ) )
    .add( "no address", () => ( <VenueCard venue={ noAddress } { ...actions }/> ) )
    .add( "no directions", () => ( <VenueCard venue={ noDirections } { ...actions }/> ) )
    .add( "no name", () => ( <VenueCard venue={ noName } { ...actions }/> ) )
    .add( "no name and phone", () => ( <VenueCard venue={ noNameAndPhone } { ...actions }/> ) )
    .add( "no phone", () => ( <VenueCard venue={ noPhone } { ...actions }/> ) )
;
