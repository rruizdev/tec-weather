export const possibleTab = (data) => ({
    city: `${data.local_names?.es ?? data.name}${data.state ? `, ${data.state}` : ''}`,
    latitude: data.lat,
    longitude: data.lon
});