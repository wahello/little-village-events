import EventDetailsView from "../containers/event-details";
import EventListView from "../containers/event-list";

import NavigatorStyles from "./styles";

export const DiscoverTab = {
    view: EventListView,
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
