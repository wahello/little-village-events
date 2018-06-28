
import { distance } from "../geo";


describe( "utils/geo", () => {

    it( "distance", () => {
        const IowaCity = { lat: 41.660100, lon: -91.534200 };
        const CedarRapids = { lat: 41.983056, lon: -91.668611 };
        const Davenport = { lat: 41.543056, lon: -90.590833 };

        expect( distance( IowaCity, IowaCity ) ).toEqual( 0 );
        expect( distance( CedarRapids, CedarRapids ) ).toEqual( 0 );
        expect( distance( Davenport, Davenport ) ).toEqual( 0 );

        expect( distance( IowaCity, CedarRapids ) ).toEqual( distance( CedarRapids, IowaCity ) );
        expect( Math.round( distance( IowaCity, CedarRapids ) ) ).toEqual( 23 );
        expect( Math.round( distance( IowaCity, Davenport ) ) ).toEqual( 49 );
    } )
} );
