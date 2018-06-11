import InterestsPicker from "../onboarding-interests-picker";

// import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";

import React from "react";


storiesOf( "Onboarding", module )
    .add( "interests picker", () => ( <InterestsPicker /> ) )
;
