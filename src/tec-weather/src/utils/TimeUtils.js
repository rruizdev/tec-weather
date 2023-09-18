function getDateObject(timestamp) {
    return new Date(timestamp * 1000);
}

function getDayOfWeek(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
}

export function getTime(timestamp) {
    var date = getDateObject(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes()}`;
}

export function getDayWithDate(timestamp) {
    var date = getDateObject(timestamp);
    return `${getDayOfWeek(date)} ${date.getDate()}/${date.getMonth() + 1}`;
}