import Onboarding from "app/components/onboarding";

import { provideState, injectState } from "app/utils/freactal";

import { compose } from "recompose";


export default compose(
    provideState( {
        computed: {
            hideNotificationsInto: ( { permissions } ) =>
                permissions.notification === "authorized" ||
                permissions.notification === "restricted"
        }
    } ),
    injectState
)( Onboarding );
