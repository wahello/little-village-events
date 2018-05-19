import registerScreen from "./register-screen";

import EventDetails from "../containers/event-details";
import EventList from "../containers/event-list";
import WebPage from "../containers/web-page";

const registerScreens = () => {
    registerScreen( EventList );
    registerScreen( EventDetails );
    registerScreen( WebPage );

    return { screen: EventList.id, title: EventList.title };
};

export default registerScreens;
