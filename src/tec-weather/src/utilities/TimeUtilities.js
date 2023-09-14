export function getTime(timestamp) {
    var date = new Date(timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
}