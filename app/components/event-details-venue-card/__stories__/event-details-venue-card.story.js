import EventDetailsVenueCard, { VenueCard } from "../event-details-venue-card";
import completeEvent from "./data/complete-event.json";
import complexAddress from "./data/complex-address.json";
import noAddress from "./data/no-address.json";
import noDirections from "./data/no-directions.json";
import noName from "./data/no-name.json";
import noNameAndPhone from "./data/no-name-and-phone.json";
import noPhone from "./data/no-phone.json";

import layout from "/.storybook/decorators/layout";

import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";


storiesOf( "EventDetailsVenueCard", module )
    .addDecorator( layout() )
    .add( "complete", () => ( <EventDetailsVenueCard event={ completeEvent } call={ number => action( `Call: ${number}` ) }/> ) )
    .add( "no venue", () => ( <EventDetailsVenueCard event={ {} } call={ number => action( `Call: ${number}` ) }/> ) )
    .add( "complex address", () => ( <VenueCard venue={ complexAddress } call={ number => action( `Call: ${number}` ) }/> ) )
    .add( "no address", () => ( <VenueCard venue={ noAddress } call={ number => action( `Call: ${number}` ) }/> ) )
    .add( "no directions", () => ( <VenueCard venue={ noDirections } call={ number => action( `Call: ${number}` ) }/> ) )
    .add( "no name", () => ( <VenueCard venue={ noName } call={ number => action( `Call: ${number}` ) }/> ) )
    .add( "no name and phone", () => ( <VenueCard venue={ noNameAndPhone } call={ number => action( `Call: ${number}` ) }/> ) )
    .add( "no phone", () => ( <VenueCard venue={ noPhone } call={ number => action( `Call: ${number}` ) }/> ) )
;
