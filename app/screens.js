import state from "./state";

import EventDetails from "./components/event-details";
import EventList from "./containers/event-list";

import { provideState } from "@textpress/freactal";

import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

export function registerScreens() {
    Navigation.registerComponent( "events.list", () => compose( provideState( state ) )( EventList ) );
    Navigation.registerComponent( "events.details", () => compose( provideState( state ) )( EventDetails ) );

    return {
        main: {
            screen: "events.list",
            title: "Iowa City"
        }
    };

}
