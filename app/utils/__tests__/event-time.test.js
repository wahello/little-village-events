import { closestEventTime, eventTense } from "../event-time";
import moment from "moment";
import sinon from "sinon";

describe( "event-time", () => {

    const todayMidday = moment( "2018-05-14T14:45:14.903-05:00" );
    const pastMorning = moment( "2018-05-10T09:00:00.000-05:00" );
    const pastEvening = moment( "2018-05-13T17:00:00.000-05:00" );
    const todayMorning = moment( "2018-05-14T09:00:00.000-05:00" );
    const todayEvening = moment( "2018-05-14T17:00:00.000-05:00" );
    const futureMorning = moment( "2018-05-20T09:00:00.000-05:00" );
    const futureEvening = moment( "2018-05-25T17:00:00.000-05:00" );

    describe( "closestEventTime", () => {

        const sandbox = sinon.sandbox.create();

        const originalDates = [ todayMidday, pastMorning, pastEvening, todayMorning, todayEvening, futureMorning, futureEvening ];
        const clonedDates = originalDates.map( d => d.clone() );

        beforeEach( () => {
            sandbox.stub( moment.fn, "toJSON" ).callsFake( function() { return this.format(); } );
        } );

        afterEach( () => {
            sandbox.restore();
        } );

        it( "events without end time", () => {
            expect( closestEventTime( { startTime: todayMorning }, todayMidday ) ).toMatchSnapshot();

            expect( () => closestEventTime( { startTime: pastMorning }, todayMidday ) ).toThrow();
            expect( () => closestEventTime( { startTime: futureMorning }, todayMidday ) ).toThrow();

            expect( originalDates ).toEqual( clonedDates );
        } );

        it( "all day events", () => {
            expect( closestEventTime( { startTime: todayMorning, allDay: true }, todayMidday ) ).toMatchSnapshot();
            expect( closestEventTime( { startTime: todayEvening, allDay: true }, todayMidday ) ).toMatchSnapshot();

            expect( () => closestEventTime( { startTime: pastMorning, allDay: true }, todayMidday ) ).toThrow();
            expect( () => closestEventTime( { startTime: futureMorning, allDay: true }, todayMidday ) ).toThrow();

            expect( originalDates ).toEqual( clonedDates );
        } );

        it( "events with end time", () => {
            expect( closestEventTime( { startTime: pastMorning, endTime: todayEvening }, todayMidday ) ).toMatchSnapshot();
            expect( closestEventTime( { startTime: pastMorning, endTime: futureEvening }, todayMidday ) ).toMatchSnapshot();
            expect( closestEventTime( { startTime: todayMorning, endTime: futureEvening }, todayMidday ) ).toMatchSnapshot();

            expect( () => closestEventTime( { startTime: pastMorning, endTime: pastEvening }, todayMidday ) ).toThrow();
            expect( () => closestEventTime( { startTime: futureMorning, endTime: futureEvening }, todayMidday ) ).toThrow();

            expect( originalDates ).toEqual( clonedDates );
        } );

    } );

    describe( "eventTense", () => {

        const calendarDay = todayMidday;

        it( "events without end time", () => {

            expect( eventTense( { startTime: todayMorning }, calendarDay, todayMidday ) ).toEqual( "past" );
            expect( eventTense( { startTime: todayMidday.clone().subtract( { minutes: 10 } ) }, calendarDay, todayMidday ) ).toEqual( "present" );
            expect( eventTense( { startTime: todayMidday.clone().add( { minutes: 10 } ) }, calendarDay, todayMidday ) ).toEqual( "upcoming" );
            expect( eventTense( { startTime: todayEvening }, calendarDay, todayMidday ) ).toEqual( "future" );

            expect( () => eventTense( { startTime: pastMorning }, calendarDay, todayMidday ) ).toThrow();
            expect( () => eventTense( { startTime: futureMorning }, calendarDay, todayMidday ) ).toThrow();

        } );

        it( "all day events", () => {
            expect( eventTense( { startTime: todayMorning, allDay: true }, calendarDay, todayMorning.clone().subtract( { minutes: 61 } ) ) ).toEqual( "future" );
            expect( eventTense( { startTime: todayMorning, allDay: true }, calendarDay, todayMorning.clone().subtract( { minutes: 10 } ) ) ).toEqual( "upcoming" );
            expect( eventTense( { startTime: todayMorning, allDay: true }, calendarDay, todayMorning.clone().add( { minutes: 10 } ) ) ).toEqual( "upcoming" );

            expect( eventTense( { startTime: todayMorning, allDay: true }, calendarDay, todayMidday ) ).toEqual( "upcoming" );

            expect( eventTense( { startTime: todayMorning, allDay: true }, calendarDay, todayEvening.clone().subtract( { minutes: 10 } ) ) ).toEqual( "upcoming" );
            expect( eventTense( { startTime: todayMorning, allDay: true }, calendarDay, todayEvening.clone().add( { minutes: 10 } ) ) ).toEqual( "past" );

            expect( () => eventTense( { startTime: pastMorning, allDay: true }, calendarDay, todayMidday ) ).toThrow();
            expect( () => eventTense( { startTime: futureMorning, allDay: true }, calendarDay, todayMidday ) ).toThrow();

        } );

        it( "events with end time", () => {
            expect( eventTense( { startTime: pastMorning, endTime: futureEvening }, calendarDay, todayMorning.clone().subtract( { minutes: 10 } ) ) ).toEqual( "upcoming" );
            expect( eventTense( { startTime: pastMorning, endTime: futureEvening }, calendarDay, todayMorning.clone().add( { minutes: 10 } ) ) ).toEqual( "present" );

            expect( eventTense( { startTime: pastMorning, endTime: todayEvening }, calendarDay, todayMidday ) ).toEqual( "present" );
            expect( eventTense( { startTime: pastMorning, endTime: futureEvening }, calendarDay, todayMidday ) ).toEqual( "present" );
            expect( eventTense( { startTime: todayMorning, endTime: futureEvening }, calendarDay, todayMidday ) ).toEqual( "present" );

            expect( eventTense( { startTime: pastMorning, endTime: futureEvening }, calendarDay, todayEvening.clone().subtract( { minutes: 10 } ) ) ).toEqual( "present" );
            expect( eventTense( { startTime: pastMorning, endTime: futureEvening }, calendarDay, todayEvening.clone().add( { minutes: 10 } ) ) ).toEqual( "past" );

            expect( () => eventTense( { startTime: pastMorning, endTime: pastEvening }, calendarDay, todayMidday ) ).toThrow();
            expect( () => eventTense( { startTime: futureMorning, endTime: futureEvening }, calendarDay, todayMidday ) ).toThrow();
        } );

    } );

} );

