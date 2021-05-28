export default function pickPropertyFilter( object, key ) {
    if( object[key] !== undefined ) {
        return object[key];
    } else {
        return 'NA';
    }
}