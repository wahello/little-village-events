
import humanizeList from "../humanize-list";

describe( "utils/humanize-list", () => {

    it( "basics", () => {
        expect( humanizeList( [] ) ).toEqual( "" );
        expect( humanizeList( [ "apples" ] ) ).toEqual( "apples" );
        expect( humanizeList( [ "apples", "oranges" ] ) ).toEqual( "apples and oranges" );
        expect( humanizeList( [ "apples", "oranges", "bananas" ] ) ).toEqual( "apples, oranges and bananas" );
    } )

    it( "conjunction", () => {
        expect( humanizeList( [ "apples", "oranges", "bananas" ], { conjunction: "&" } ) )
            .toEqual( "apples, oranges & bananas" );
    } )

    it( "maxLength", () => {
        expect( humanizeList( [ "apples", "oranges", "bananas" ], { maxLength: 3 } ) )
            .toEqual( "apples, oranges and bananas" );

        expect( humanizeList( [ "apples", "oranges", "bananas", "kiwis" ], { maxLength: 3 } ) )
            .toEqual( "apples, oranges, bananas etc." );

        expect( humanizeList( [ "apples", "oranges", "bananas", "kiwis" ], { maxLength: 3, etcConjunction: "& more" } ) )
            .toEqual( "apples, oranges, bananas & more" );
    } );
} );
