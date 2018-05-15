

export default desc => {
    const detailsRe = /(<p>(\w+(?:\s+\w+)*):(\s*\w+(?:\s+\w+)*)<\/p>)/g;

    const details = [];
    const description = desc
        .replace( detailsRe, ( match, p1, p2, p3 ) => {
            details.push( [ p2, p3 ] );
            return "";
        } )
        .replace( /(<br>)/g, "" )
        .replace( /(<p><\/p>)/g, "" )
        ;

    return { description, details };
};
