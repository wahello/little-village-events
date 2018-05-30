import DiscoverEventsView from "../containers/discover-events";
import EventDetailsView from "../containers/event-details";

import NavigatorStyles from "./styles";

export const DiscoverEventsTab = {
    view: DiscoverEventsView,
    id: "events.discover",
    navigatorStyle: {
        ...NavigatorStyles.opaque,
    },
    title: "Iowa City"
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
