const categories = require( "./categories.json" );
const locations = require( "./locations.json" );
const userProfiles = require( "./user-profiles.json" );


export default realm => {
    realm.write( () => {
        categories.forEach( x => realm.create( "Category", x, true ) );
        locations.forEach( x => realm.create( "Location", x, true ) );
        userProfiles.forEach( x => realm.create( "UserProfile", x, true ) );
    } )
};
