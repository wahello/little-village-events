import _find from "lodash/find";

export const eventImage = event => {
    const { multimedia } = event;
    if ( !multimedia )
        return "";

    const image = _find( multimedia, image => image.source === "uc" && image.type === "img" && !!image.id );
    return image ? `https://ucarecdn.com/${image.id}/` : null;
};

