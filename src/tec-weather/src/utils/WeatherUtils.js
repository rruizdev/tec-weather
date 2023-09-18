export function getOrientation(degrees) {
    const orientations = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    return orientations[Math.round(degrees / (360 / orientations.length)) % orientations.length];
}