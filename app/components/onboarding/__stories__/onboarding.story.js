import OnboardingStart from "../onboarding-start";
import InterestsPicker from "../onboarding-interests-picker";
import InterestsIntro from "../onboarding-interests-intro";
import NotificationsIntro from "../onboarding-notifications-intro";
import LocationIntro from "../onboarding-location-intro";
import LocationPicker from "../onboarding-location-picker";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";

const categories = require( "app/models/seed/categories.json" );
const locations = require( "app/models/seed/locations.json" );


storiesOf( "Onboarding Screens", module )
    .add( "onboarding start", () => ( <OnboardingStart
        onContinue={ action( "onContinue" ) }
    /> ) )
    .add( "interests intro", () => ( <InterestsIntro
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
    .add( "interests picker", () => ( <InterestsPicker
        categories={ categories }
        selected={ [] }
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
    .add( "notifications intro", () => ( <NotificationsIntro
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
    .add( "location intro", () => ( <LocationIntro
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
    .add( "location picker", () => ( <LocationPicker
        locations={ locations }
        selected={ [] }
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
;
