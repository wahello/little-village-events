import { showOnboardingScreen } from "app/containers/onboarding";
import { createInstance } from "app/utils/realm";

import { registerScreens, onboardingNav, mainAppNav } from "./screens";

import { Navigation } from "react-native-navigation";


export const startOnboarding = () =>
    Navigation.startSingleScreenApp( onboardingNav() );


export const startMainApp = () =>
    Navigation.startTabBasedApp( mainAppNav() );


const startApp = async () => {
    registerScreens( {
        realm: createInstance()
    } );

    if ( await showOnboardingScreen() )
        startOnboarding();
    else
        startMainApp();
};

export default startApp;
