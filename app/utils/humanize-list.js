export default ( list, { conjunction = "and", maxLength, etcConjunction = "etc." } = {} ) => {
    const listLength = list.length;
    if ( !listLength )
        return "";

    if ( listLength === 1 )
        return list[0];

    if ( listLength > maxLength )
        return [ list.slice( 0, maxLength ).join( ", " ), etcConjunction ].join( " " );

    const lastIndex = listLength - 1;
    return [ list.slice( 0, lastIndex ).join( ", " ), conjunction, list[lastIndex] ].join( " " );
};
