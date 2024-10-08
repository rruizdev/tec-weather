export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getOrientation = (degrees) => {
    const orientations = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    return orientations[Math.round(degrees / (360 / orientations.length)) % orientations.length];
}