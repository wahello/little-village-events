import permissions from "app/utils/permissions";

import config from "app/config";

import * as calendar from "react-native-add-calendar-event";

const permission = permissions(
    "event",
    `To add an event to your calendar, you'll need to give ${config.appName} permission to access your calendar in Settings`
);

export default {

    addEvent: async ( calendarEvent ) => {
        if ( await permission.request() ) {
            try {
                await calendar.presentEventCreatingDialog( calendarEvent );
            } catch ( x ) {
                console.error( "Failed addEventToCalendar", x.message, x )
            }
        }
    }

};
