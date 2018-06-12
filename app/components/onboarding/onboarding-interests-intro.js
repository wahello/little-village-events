import OnboardingStepIntro from "./onboarding-step-intro";

import React from "react";


export default ( { ...props } ) =>
    <OnboardingStepIntro
        title="Let us know what you like"
        text="... and we’ll personalize your home screen to show you the events just for you."
        {...props}
    />
;
