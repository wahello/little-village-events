import EventDetails from "./components/event-details";
import EventList from "./containers/event-list";

import { provideState } from "@textpress/freactal";

import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

const state = {};
const stateProvider = {
    initialState: () => state
};

export function registerScreens() {
    Navigation.registerComponent( "events.list", () => compose( provideState( stateProvider ) )( EventList ) );
    Navigation.registerComponent( "events.details", () => compose( provideState( stateProvider ) )( EventDetails ) );

    return {
        main: {
            screen: "events.list",
            title: "Events"
        }
    };

}
