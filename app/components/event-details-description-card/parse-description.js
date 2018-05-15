import htmlparser from "htmlparser2";
import toPairs from "lodash/topairs";
import startsWith from "lodash/startswith";
import last from "lodash/last";


const formatAttrs = attrs => toPairs( attrs )
    .map( ( [ attr, value ] ) => `${attr}="${value}"` )
;


const detailsRe = /^([a-z]+(?:(?:\s+[a-z]+)|(?:\s*[\/&\-+\.]\s*[a-z]+))*):\s*(\w+(?:\W+\w*)*)$/i;

export const parseAsDetails = str => {
    const m = str.match( detailsRe );
    return m && m[1].length < 30 && m[2].length < 70
        ? [ m[1], m[2] ]
        : null;
};


const shouldUnwind = ( result, tagname ) => {
    switch ( tagname ) {
        case "p":
        case "br":
            return startsWith( last( result ), `<${tagname}` );
    }

    return false;
}

export default desc => {

    const details = [];
    const tagsStack = [];

    const result = [];
    const parser = new htmlparser.Parser( {
        onopentag: ( tagname, attrs ) => {
            result.push( `<${ [ tagname, ...formatAttrs( attrs ) ].join( " " ) }>` )
            tagsStack.push( tagname );
        },
        ontext: text => {
            const d = parseAsDetails( text );
            if ( d ) details.push( d );
            else result.push( text );
        },
        onclosetag: tagname => {
            if ( shouldUnwind( result, tagname ) ) result.pop();
            else result.push( `</${tagname}>` );
            const popped = tagsStack.pop();
            if ( popped != tagname )
                console.log( `WARNING: mismatching closing tag (</${tagname}> vs <${popped}>)` );
        }
    } );

    parser.write( desc );
    parser.end();

    return { description: result.join( "" ), details };
};
