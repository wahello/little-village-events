import OnboardingStepIntro from "./onboarding-step-intro";

import React from "react";


export default ( { ...props } ) =>
    <OnboardingStepIntro
        title="Stay on top of your plans"
        text="Get reminders and last-minute updates about events you RSVP-ed to."
        {...props}
    />
;
