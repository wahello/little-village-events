import Onboarding from "app/components/onboarding";

import { injectState } from "app/utils/freactal";

import { compose } from "recompose";


export default compose(
    injectState
)( Onboarding );
