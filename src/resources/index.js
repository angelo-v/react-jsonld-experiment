
export const fetchResource = (uri) => ({
    type: 'FETCH_RESOURCE',
    payload: {
        uri
    }
});
export default (state) => state