import Onboarding from "app/components/onboarding";

import { provideState, injectState } from "app/utils/freactal";

import config from "app/config";

import { compose } from "recompose";


export default compose(
    provideState( {
        effects: {
            requestNotificationsPermission: ( effects, callback ) => state => {
                effects.requestPermission(
                    "notification",
                    `You can grant ${config.appName} permission to send you notifications in Settings`,
                    callback
                );
                return state;
            }
        },
        computed: {
            hideNotificationsInto: ( { permissions } ) =>
                permissions.notification === "authorized" ||
                permissions.notification === "restricted"
        }
    } ),
    injectState
)( Onboarding );
