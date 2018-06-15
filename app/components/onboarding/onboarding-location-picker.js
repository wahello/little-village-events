import OnboardingPicker from "./onboarding-picker";
import EventLocationsChooser from "../../components/event-locations-chooser";

import Locations from "../../models/locations";

import { update, injectState, provideState } from "@textpress/freactal";

import React from "react";

import { compose } from "recompose";
import isNil from "lodash/isNil";


const OnboardingLocationsPicker = ( { state, effects, onSkip, onContinue } ) =>
    <OnboardingPicker
        title="Show events in or near"
        state={state}
        onSkip={onSkip}
        onContinue={ () => onContinue( state.selected ) }
    >
        <EventLocationsChooser
            locations={ state.locations }
            selected={ state.selected }
            onChange={ effects.updateSelected }
        />
    </OnboardingPicker>
;


export default compose(
    provideState( {
        initialState: ( { selected } ) => ( {
            locations: Locations,
            selected
        } ),
        effects: {
            updateSelected: update( ( state, value ) => {
                return { selected: value };
            } )
        },
        computed: {
            canContinue: ( { selected } ) => !isNil( selected ),
            canSkip: () => false
        }
    } ),
    injectState
)( OnboardingLocationsPicker );
