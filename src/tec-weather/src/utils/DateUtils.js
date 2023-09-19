function getDateObject(timestamp) {
    return new Date(timestamp * 1000);
}

export function getTime(timestamp) {
    var date = getDateObject(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes()}`;
}