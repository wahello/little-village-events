import { registerImageSource } from "../../app/utils/image-uri-builder";

const lorem = ( image ) => {
    const imageUrl = "https://source.unsplash.com/random";

    return {
        scale: ( width, height ) => `${imageUrl}/${width}x${height}/?${image.type},featured`,
        resize: ( size ) => `${imageUrl}/${size}x${size}/?${image.type},featured`
    }
};

registerImageSource( "lorem", lorem );
