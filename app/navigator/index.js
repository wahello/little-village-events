import makeGlobalState from "./states/global-state";

import { createInstance } from "app/utils/realm";
import api from "app/api";

import { mainAppNav, onboardingNav, registerScreens } from "./screens";

import { Navigation } from "react-native-navigation";


export const startOnboarding = () =>
    Navigation.startSingleScreenApp( onboardingNav() );


export const startMainApp = () =>
    Navigation.startTabBasedApp( mainAppNav() );


const startApp = () => {
    const globalState = makeGlobalState( {
        realm: createInstance(),
        api
    } );

    registerScreens( globalState.getChildContext );

    if ( globalState.showOnboardingScreen() )
        startOnboarding();
    else
        startMainApp();
};

export default startApp;
