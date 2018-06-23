import Onboarding from "app/components/onboarding";
import { startMainApp } from "app/navigator";

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
            },

            saveInterests: ( effects, interests ) => {
                effects.updateUserProfile( { interests } );
                return state => state;
            },

            saveLocation: ( effects, location ) => {
                effects.updateUserProfile( { location } );
                return state => state;
            },

            finishOnboarding: effects => {
                effects.updateUserProfile( { newUser: false } );
                startMainApp();
                return state => state;
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
