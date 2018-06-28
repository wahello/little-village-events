const debugLogs = {
    "app:load-events": true,
};

const prodLogs = {
};


export default {
    appName: "little_village_events",
    apiRoot: "http://littlevillagemag.com/iowa-city-area-events-calendar",
    daysToLoad: 14,
    eventThresholds: {
        dayStart: 0,
        dayLength: 1440,
        upcoming: 60,
        past: 60,
        interval: 15
    },
    debug: __DEV__ ? debugLogs : prodLogs
};
