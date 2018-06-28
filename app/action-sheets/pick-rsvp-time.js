import HeaderView from "./components/header";
import DateView from "./components/date";
import TimeView from "./components/time";
import DateTimePicker from "./components/date-time-picker";

import { addToDate, dayEnd, dayStart, maxDate, moveTimeToDate, now } from "app/utils/date";
import { defaultEventEndTime, nextRSVPTime, normalizeEventTime } from "app/utils/event-time";

import config from "app/config";

import { Button, Separator } from "react-native-power-action-sheet";

import React, { Component, Fragment } from "react";
import { LayoutAnimation, Text, View } from "react-native";

const dateTimeFuncs = {
    dateRange: ( { rsvpInfo } ) => ( {
        min: maxDate( rsvpInfo.first, normalizeEventTime( now() ) ),
        max: dayEnd( rsvpInfo.last )
    } ),
    initialDate: dateRange => {
        const noon = addToDate( dayStart( dateRange.min ), { hours: 12 } );
        return maxDate( dateRange.min, noon );
    },
    calcRSVPTime: ( date ) => ( {
        startTime: date,
        endTime: defaultEventEndTime( { startTime: date } )
    } )
};

const modes = {
    date: {
        header: {
            title: "Pick your date",
            message: "You are RSVP-ing to an ongoing event. Please check the event’s webpage if you‘re not sure about event’s venue accessibility on a particular date.",
            dateHighlighted: true
        },
        dateRange: ( { rsvpTime, rsvpInfo } ) => ( {
            min: rsvpTime.startTime,
            max: nextRSVPTime( rsvpInfo, rsvpInfo.last ).startTime
        } ),
        initialDate: dateRange => dateRange.min,
        calcRSVPTime: ( date, rsvpTime ) => ( {
            startTime: moveTimeToDate( rsvpTime.startTime, date ),
            endTime: moveTimeToDate( rsvpTime.endTime, date )
        } )
    },
    time: {
        header: {
            title: "Pick your time",
            message: "You are RSVP-ing to an all-day event. Please check the event’s webpage if you're not sure about actual event and/or venue hours.",
            timeHighlighted: true
        },
        ...dateTimeFuncs
    },
    datetime: {
        header: {
            title: "Pick your date and time",
            message: "You are RSVP-ing to an ongoing all-day event. Please check the event’s webpage if you're not sure about actual event and/or venue hours.",
            dateHighlighted: true,
            timeHighlighted: true
        },
        ...dateTimeFuncs
    }

};

const Header = ( { styles, header, rsvpTime } ) => (
    <HeaderView styles={ styles } top={ true }>
        <Text style={ styles.h1 }>{ header.title }</Text>
        <Text style={ [ styles.p, styles.infoBlock ] }>{ header.message }</Text>
        <View style={ styles.dateTimeRow }>
            <DateView styles={ styles } highlighted={ header.dateHighlighted } date={ rsvpTime.startTime }/>
            <TimeView styles={ styles } highlighted={ header.timeHighlighted } date={ rsvpTime.startTime }/>
        </View>
    </HeaderView>
);

const MoreInfoButton = ( { styles, eventSummary, onPress } ) =>
    eventSummary.moreInfo ? (
        <Fragment>
            <Separator styles={ styles }/>
            <Button styles={ styles } onPress={ onPress }>View event's webpage</Button>
        </Fragment>
    ) : null
;

class PickRSVPTimeActionSheet extends Component {

    constructor( props ) {
        super( props );

        const { mode, rsvpTime } = props.options;

        const modeSettings = modes[ mode ];
        const dateRange = modeSettings.dateRange( props.options );
        const selectedDate = modeSettings.initialDate( dateRange );

        this.state = {
            ...props.options,
            ...modeSettings,
            dateRange,
            selectedDate,
            rsvpTime: modeSettings.calcRSVPTime( selectedDate, rsvpTime ),
            minuteInterval: config.eventThresholds.interval
        };
    }

    onDateChange = ( selectedDate ) => {
        const { calcRSVPTime, rsvpTime } = this.state;
        this.setState( { selectedDate, rsvpTime: calcRSVPTime( selectedDate, rsvpTime ) } );
    };

    openWebBrowser = () => {
        this.state.openWebBrowser( this.state.eventSummary.moreInfo );
    };

    proceed = () => {
        const { handler } = this.state;
        handler
            ? handler( { ...this.props, value: this.state.rsvpTime } )
            : this.props.close( this.state.rsvpTime )
        ;
    };

    render() {
        const { styles } = this.props;
        const {
            eventSummary,
            mode,
            dateRange,
            minuteInterval,
            selectedDate
        } = this.state;
        return (
            <Fragment>
                <Header styles={ styles } { ...this.state }/>
                <Separator { ...this.props }/>
                <DateTimePicker
                    style={ styles.control }
                    date={ selectedDate }
                    mode={ mode }
                    maximumDate={ dateRange.max }
                    minimumDate={ dateRange.min }
                    minuteInterval={ minuteInterval }
                    onDateChange={ this.onDateChange }
                />
                <MoreInfoButton styles={ styles } eventSummary={ eventSummary } onPress={ this.openWebBrowser }/>
                <Separator { ...this.props }/>
                <Button
                    { ...this.props }
                    bottom={ true }
                    onPress={ this.proceed }
                >Continue to RSVP</Button>
            </Fragment>

        );
    }
}

export default ( options ) => (
    {
        sheetView: PickRSVPTimeActionSheet,
        ...options
    }
);
