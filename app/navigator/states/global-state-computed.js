import { toPlainObj } from "app/utils/realm";

const asArray = ( realm, objectType ) =>
    [ ...realm.objects( objectType ).sorted( "order" ).map( c => toPlainObj( c ) ) ]
;


export const Categories = ( { realm } ) => asArray( realm, "Category" );
export const Locations = ( { realm } ) => asArray( realm, "Location" );
export const showOnboardingScreen = ( { userProfile } ) => userProfile.newUser;
