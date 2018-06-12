import InterestsPicker from "../onboarding-interests-picker";
import InterestsIntro from "../onboarding-interests-intro";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";


storiesOf( "Onboarding", module )
    .add( "interests intro", () => ( <InterestsIntro
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
    .add( "interests picker", () => ( <InterestsPicker
        onSkip={ action( "onSkip" ) }
        onContinue={ action( "onContinue" ) }
    /> ) )
;
