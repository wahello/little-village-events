import EventDetails from "../containers/event-details/index";
import EventList from "../containers/event-list/index";
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

    return { screen: EventList.id, title: EventList.title };
};

export default registerScreens;
