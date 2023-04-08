import geohash from "ngeohash";
export const getShortUserName = (username) => {
    if (username && username.length > 0) {
        let short_name = ""
        var res = username.split(" ");
        if (res[0] && res[0].length > 0) {
            short_name = res[0].charAt(0)
        }
        if (res[1] && res[1].length > 0) {
            short_name = short_name + res[1].charAt(0)
        }
        return short_name.toUpperCase()
    }
    return null
}
export const separateAddress = components => {
    let zip = null,
        street = null,
        region = null;
    if (components && components.length) {
        components.map(item => {
            console.log('separateAddress -> item', item);
            if (item.types.includes('postal_code')) {
                zip = item.long_name;
            }
            if (item.types.includes('street_number')) {
                if (street) street = item.long_name + ' ' + street;
                else street = item.long_name;
            }
            if (item.types.includes('route')) {
                if (street) street = street + ' ' + item.long_name;
                else street = item.long_name;
            }
            if (item.types.includes('locality')) {
                region = item.long_name;
            }
        });
    }
    return {
        street,
        zip,
        region,
    };
};

export const getGeohashRange = (
    latitude,
    longitude,
    distance, // km
) => {
    //1 km = 0.6213711922 mi, mi(Int)
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);

    return {
        lower,
        upper
    };
};

export function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
export function toRad(Value) {
    return Value * Math.PI / 180;
}

export function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
