import { registerImageSource } from "../../app/utils/imageUriBuilder";

const lorem = ( image ) => {
    const imageUrl = "https://source.unsplash.com/random";

    return {
        scale: ( width, height ) => `${imageUrl}/${width}x${height}/?${image.term},featured`,
        resize: ( size ) => `${imageUrl}/${size}x${size}/?${image.term},featured`
    }
};

registerImageSource( "lorem", lorem );
