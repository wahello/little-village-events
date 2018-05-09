import EventDetails from "/app/containers/event-details";

export default {
    id: "events.details",
    view: EventDetails,
    nav: {
        title: "",
        backButtonTitle: "",
        navigatorStyle: {
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarTransparent: true
        }
    }
};
