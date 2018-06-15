import NavigatorStyles from "./styles";
import registerScreen from "./register-screen";

import DiscoverEventsView from "app/containers/discover-events";
import EventDetailsView from "app/containers/event-details";
import RSVPEventsView from "app/containers/rsvp-events";
import OnboardingView from "app/containers/onboarding";

import omit from "lodash/omit";


const Onboarding = {
    view: OnboardingView,
    id: "onboarding",
    navigatorStyle: {
        ...NavigatorStyles.transparentLight
    },
    navigatorButtons: {}
};


export const onboardingNav = () => ( {
    screen: {
        screen: Onboarding.id,
        ...omit( Onboarding, [ "view", "id" ] )
    }
} );


const DiscoverEventsTab = {
    view: DiscoverEventsView,
    id: "events.discover",
    navigatorStyle: {
        ...NavigatorStyles.opaque,
        navBarHidden: false
    },
    title: "Iowa City"
};


const RSVPEventsTab = {
    view: RSVPEventsView,
    id: "events.rsvps",
    navigatorStyle: {
        ...NavigatorStyles.navBarHiddenLight
    }
};


export const mainAppNav = () => ( {
    tabs: [
        {
            screen: DiscoverEventsTab.id,
            title: DiscoverEventsTab.title,
            icon: require( "../components/icons/pngs/favorite.png" ),
            selectedIcon: require( "../components/icons/pngs/favorite-active.png" ),
            iconInsets: {
                top: 6,
                bottom: -6
            }
        },
        {
            screen: DiscoverEventsTab.id,
            title: DiscoverEventsTab.title,
            icon: require( "../components/icons/pngs/discover.png" ),
            selectedIcon: require( "../components/icons/pngs/discover-active.png" ),
            iconInsets: {
                top: 6,
                bottom: -6
            }
        },
        {
            screen: RSVPEventsTab.id,
            title: RSVPEventsTab.title,
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
    },
    animationType: "fade"
} );


export const EventDetails = {
    view: EventDetailsView,
    id: "events.details",
    navigatorStyle: {
        ...NavigatorStyles.transparent,
        tabBarHidden: true
    },
    backButtonTitle: ""
};


export const registerScreens = () => {
    registerScreen( Onboarding );
    registerScreen( DiscoverEventsTab );
    registerScreen( RSVPEventsTab );
    registerScreen( EventDetails );
};
