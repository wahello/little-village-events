import DiscoverEventsView from "../containers/discover-events";
import EventDetailsView from "../containers/event-details";
import RSVPEventsView from "../containers/rsvp-events";

import NavigatorStyles from "./styles";

export const DiscoverEventsTab = {
    view: DiscoverEventsView,
    id: "events.discover",
    navigatorStyle: {
        ...NavigatorStyles.opaque,
        navBarHidden: false
    },
    title: "Iowa City"
};

export const RSVPEventsTab = {
    view: RSVPEventsView,
    id: "events.rsvps",
    navigatorStyle: {
        ...NavigatorStyles.opaque,
        navBarHidden: false
    },
    title: "RSVPs"
};

export const EventDetails = {
    view: EventDetailsView,
    id: "events.details",
    navigatorStyle: {
        ...NavigatorStyles.transparent,
        tabBarHidden: true
    },
    backButtonTitle: ""
};
