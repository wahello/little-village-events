import makeGlobalStateContextProvider from "./states/global-state";

import { showOnboardingScreen } from "app/containers/onboarding";
import { createInstance } from "app/utils/realm";
import api from "app/api";

import { mainAppNav, onboardingNav, registerScreens } from "./screens";

import { Navigation } from "react-native-navigation";


export const startOnboarding = () =>
    Navigation.startSingleScreenApp( onboardingNav() );


export const startMainApp = () =>
    Navigation.startTabBasedApp( mainAppNav() );


const startApp = async () => {
    registerScreens( makeGlobalStateContextProvider( {
        realm: createInstance(),
        api
    } ) );

    if ( await showOnboardingScreen() )
        startOnboarding();
    else
        startMainApp();
};

export default startApp;
