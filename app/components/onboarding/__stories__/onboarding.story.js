import Onboarding from "../onboarding";

import InterestsPicker from "../onboarding-interests-picker";
import InterestsIntro from "../onboarding-interests-intro";
import NotificationsIntro from "../onboarding-notifications-intro";
import LocationIntro from "../onboarding-location-intro";
import LocationPicker from "../onboarding-location-picker";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";


storiesOf( "Onboarding", module )
    .add( "default", () => <Onboarding /> )
    .add( "interests intro", () => ( <InterestsIntro
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
    .add( "interests picker", () => ( <InterestsPicker
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
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
;
