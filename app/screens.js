import EventDetails from "./components/event-details";
import EventList from "./containers/event-list";

import { provideState } from "@textpress/freactal";

import { Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

const state = {
    windowDimensions: Dimensions.get( "window" ),
    categories: {
        "62": "Editors' Picks",
        "63": "Music",
        "64": "Art/Exhibition",
        "65": "Theatre/Performance",
        "81": "Literature",
        "67": "Cinema",
        "68": "Foodie",
        "79": "Education",
        "80": "Community",
        "71": "Fashion",
        "66": "Drink Specials",
        "82": "Crafty",
        "83": "Family",
        "85": "Sports / Rec"
    }
};

const stateProvider = {
    initialState: () => state
};

export function registerScreens() {
    Navigation.registerComponent( "events.list", () => compose( provideState( stateProvider ) )( EventList ) );
    Navigation.registerComponent( "events.details", () => compose( provideState( stateProvider ) )( EventDetails ) );

    return {
        main: {
            screen: "events.list",
            title: "Iowa City"
        }
    };

}
