import Onboarding from "./onboarding";
import state from "./onboarding.state";

import { provideState, injectState } from "app/utils/freactal";

import { compose } from "recompose";


export default compose(
    provideState( state ),
    injectState
)( Onboarding );
