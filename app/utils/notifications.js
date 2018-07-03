import PushNotification from "react-native-push-notification";
import permissions from "app/utils/permissions";
import config from "app/config";

const notificationConfig = {

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    // senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: false
};


const permissionTypes = {
    type: Object
        .keys( notificationConfig.permissions )
        .map( type => notificationConfig.permissions[ type ] ? type : "" )
        .filter( type => !!type )
};


PushNotification.configure( {
    ...notificationConfig,
    // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function ( token ) {
    //     console.log( "TOKEN:", token );
    // },

    // (required) Called when a remote or local notification is opened or received
    // onNotification: function ( notification ) {
    //     console.log( "NOTIFICATION:", notification );
    //
    //     // process the notification
    //
    //     // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    //     notification.finish( PushNotificationIOS.FetchResult.NoData );
    // },

} );

const permission = permissions(
    "notification",
    `You can grant ${config.appName} permission to send you notifications in Settings`,
    permissionTypes
);

export default {
    init: () => permission.request(),
    initialized: () => permission.isInitialized(),

    schedule: async ( notification ) => {
        if ( await permission.request() )
            await PushNotification.localNotificationSchedule( notification );
    },
    cancel: async ( notification ) => {
        if ( await permission.isAuthorized() )
            await PushNotification.cancelLocalNotifications( notification );
    },

    setIconBadgeNumber: async number => {
        if ( await permission.request( permissionTypes ) )
            await PushNotification.setApplicationIconBadgeNumber( number );
    }
};
