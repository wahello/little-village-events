const categories = require( "./categories.json" );
const locations = require( "./locations.json" );
const timePeriods = require( "./time-periods.json" );
const userProfiles = require( "./user-profiles.json" );


const isSeeded = async db =>
    ( await db.findByIds( "UserProfile", userProfiles[0].id ) ).length
;


export default async db => {
    if ( !await isSeeded( db ) ) {
        await db.transaction( async tm => {
            await Promise.all( [
                tm.save( "Category", categories ),
                tm.save( "Location", locations ),
                tm.save( "TimePeriod", timePeriods ),
            ] );

            await tm.save( "UserProfile", userProfiles )
        } );
    }
};
