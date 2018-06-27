const categories = require( "./categories.json" );
const locations = require( "./locations.json" );
const timePeriods = require( "./time-periods.json" );
const userProfiles = require( "./user-profiles.json" );


export default realm => {
    if ( realm.empty ) {
        realm.write( () => {
            categories.forEach( x => realm.create( "Category", x, true ) );
            locations.forEach( x => realm.create( "Location", x, true ) );
            timePeriods.forEach( x => realm.create( "TimePeriod", x, true ) );
            userProfiles.forEach( x => realm.create( "UserProfile", x, true ) );
        } );
    }
};
