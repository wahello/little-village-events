import OnboardingStepIntro from "./onboarding-step-intro";

import React from "react";


export default ( { ...props } ) =>
    <OnboardingStepIntro
        title="Tell us how far you’d go"
        text="By default we show you all matching events in the Creative Corridor area, but if you’re unlikely to travel too far for a night out, let us know!"
        {...props}
    />
;
