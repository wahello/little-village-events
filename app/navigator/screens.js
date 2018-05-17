import EventDetails from "../containers/event-details";
import EventList from "../containers/event-list";
import WebPage from "../containers/web-page";

import state from "../state";

import { provideState } from "../utils/freactal";

import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

const registerScreen = screen => {
    Navigation.registerComponent( screen.id, () => compose( provideState( state ) )( screen ) );
};

const registerScreens = () => {
    registerScreen( EventList );
    registerScreen( EventDetails );
    registerScreen( WebPage );

    return { screen: EventList.id, title: EventList.title };
};

export default registerScreens;
