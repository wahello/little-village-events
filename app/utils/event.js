import _get from "lodash/get";
import _find from "lodash/find";
import _reduce from "lodash/reduce";

export const getEventImageUrl = event => {
    const { multimedia } = event;
    if ( !multimedia )
        return "";

    const image = _find( multimedia, image => image.source === "uc" && image.type === "img" && !!image.id );
    return image ? `https://ucarecdn.com/${image.id}/` : null;
};

const getFieldValue = ( rawEvent, field, source ) => {
    if ( source === true )
        return _get( rawEvent, field, null );
    if ( typeof source === "string" )
        return _get( rawEvent, source, null );
    return source( rawEvent );
};

export const getEventFields = ( rawEvent, fieldsMap ) => {
    return _reduce( fieldsMap, ( result, source, field ) => {
        result[ field ] = getFieldValue( rawEvent, field, source );
        return result;
    }, {} )
};
