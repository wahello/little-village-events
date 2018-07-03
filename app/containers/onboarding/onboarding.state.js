import { startMainApp } from "app/navigator";

import notifications from "app/utils/notifications";
import { mergeIntoState } from "app/utils/freactal";


export default {
    initialState: () => ( {
        showNotificationsIntro: false
    } ),

    effects: {
        initialize: async () => {
            return mergeIntoState( {
                showNotificationsIntro: !await notifications.initialized()
            } )
        },

        requestNotificationsPermission: async () => {
            await notifications.init();
            return state => state;
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
    }
};
