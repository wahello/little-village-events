
const { sin, cos, acos } = Math;

export const distance = ( p1, p2 ) => {
    const piBy180 = 0.017453292519943295; // Math.PI / 180
    const radlat1 = piBy180 * p1.lat;
    const radlat2 = piBy180 * p2.lat;
    const theta = p1.lon - p2.lon;
    const radtheta = piBy180 * theta;
    const dist = sin( radlat1 ) * sin( radlat2 ) + cos( radlat1 ) * cos( radlat2 ) * cos( radtheta );
    return acos( dist ) * 3958.5654065588574; // 180 / Math.PI * 60 * 1.1515
};
