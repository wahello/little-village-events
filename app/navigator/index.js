import makeGlobalState from "./states/global-state";

import { createInstance } from "app/utils/db";
import api from "app/api";

import { mainAppNav, onboardingNav, registerScreens } from "./screens";

import { Navigation } from "react-native-navigation";


export const startOnboarding = () =>
    Navigation.startSingleScreenApp( onboardingNav() );


export const startMainApp = () =>
    Navigation.startTabBasedApp( mainAppNav() );


const startApp = async () => {
    const globalState = await makeGlobalState( {
        db: await createInstance(),
        api
    } );

    registerScreens( globalState.getChildContext );

    if ( globalState.showOnboardingScreen() )
        startOnboarding();
    else
        startMainApp();
};

export default startApp;
