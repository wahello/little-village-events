import { startMainApp } from "app/navigator";

import config from "app/config";


export default {
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
};
