import _reduce from "lodash/reduce";

const noImage = {
    scale: ( width, height ) => null,
    resize: ( size ) => null
};


const uc = image => {
    if ( image.type !== "img" || !image.id )
        return null;

    const imageUrl = `https://ucarecdn.com/${image.id}`;

    return {
        scale: ( width, height ) => `${imageUrl}/-/scale_crop/${width}x${height}/center/-/enhance/`,
        resize: ( size ) => `${imageUrl}/-/resize/x${size}/-/crop/${size}x${size}/center/`
    };
};


const lorem = ( image ) => {
    const imageUrl = "https://source.unsplash.com/random";

    return {
        scale: ( width, height ) => `${imageUrl}/${width}x${height}/?${image.term},featured`,
        resize: ( size ) => `${imageUrl}/${size}x${size}/?${image.term},featured`
    }
};


const sources = {
    uc,
    lorem
};


const imageUriBuilder = event => {
    return _reduce( event.multimedia || [],
        ( result, image ) =>
            result
            || sources[ image.source ]
            && sources[ image.source ]( image )
        , null
    ) || noImage;
};


export default imageUriBuilder;
