import registerScreen from "./register-screen";

import EventDetails from "../containers/event-details";
import EventList from "../containers/event-list";
import WebPage from "../containers/web-page";

const registerScreens = () => {
    registerScreen( EventList );
    registerScreen( EventDetails );
    registerScreen( WebPage );

    return {
        tabs: [
            {
                screen: EventList.id,
                title: EventList.title,
                icon: require( "../components/icons/pngs/favorite.png" ),
                selectedIcon: require( "../components/icons/pngs/favorite-active.png" ),
                iconInsets: {
                    top: 6,
                    bottom: -6
                }
            },
            {
                screen: EventList.id,
                title: EventList.title,
                icon: require( "../components/icons/pngs/discover.png" ),
                selectedIcon: require( "../components/icons/pngs/discover-active.png" ),
                iconInsets: {
                    top: 6,
                    bottom: -6
                }
            },
            {
                screen: EventList.id,
                title: EventList.title,
                icon: require( "../components/icons/pngs/rsvps.png" ),
                selectedIcon: require( "../components/icons/pngs/rsvps-active.png" ),
                iconInsets: {
                    top: 6,
                    bottom: -6
                }
            }
        ],
        tabsStyle: {
            tabBarButtonColor: "#929292",
            tabBarSelectedButtonColor: "#007AFF",
            tabBarBackgroundColor: "#F9F9F9"
        },
        appStyle: {
            keepStyleAcrossPush: false
        }
    };
};

export default registerScreens;
