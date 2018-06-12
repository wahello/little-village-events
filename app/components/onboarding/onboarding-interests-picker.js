import OnboardingPicker from "./onboarding-picker";
import EventCategoriesChooser from "../../components/event-categories-chooser";

import Categories from "../../models/categories";

import { update, injectState, provideState } from "@textpress/freactal";

import React from "react";

import { compose } from "recompose";


const OnboardingInterestsPicker = ( { state, effects, onSkip, onContinue } ) =>
    <OnboardingPicker
        title="Select at least three categories"
        state={state}
        onSkip={onSkip}
        onContinue={onContinue}
    >
        <EventCategoriesChooser
            categories={ state.categories }
            selected={ state.selected }
            onChange={ effects.updateSelected }
        />
    </OnboardingPicker>
;


export default compose(
    provideState( {
        initialState: () => ( {
            categories: Categories,
            selected: []
        } ),
        effects: {
            updateSelected: update( ( state, value ) => {
                return { selected: value };
            } )
        },
        computed: {
            canContinue: ( { selected } ) => selected.length >= 3,
            canSkip: ( { canContinue } ) => !canContinue
        }
    } ),
    injectState
)( OnboardingInterestsPicker );
