/* eslint no-restricted-globals: ["off", "location"] */

import * as jsonld from 'jsonld';

const context = {
    "title": "http://www.w3.org/1999/02/22-rdf-syntax-ns#title",
    "articleList": {
        "@id": "http://schema.example/blog/articleList",
        "@type": "@id"
    },
    "navigation": {
        "@id": "http://schema.example/blog/navigation",
        "@type": "@id"
    }
};


export function resourceFailed(uri, err) {
    return {
        type: 'RESOURCE_FAILED',
        payload: err,
        meta: {
            uri
        }
    };
}
export function resourceIsLoading(uri) {
    return {
        type: 'RESOURCE_LOADING',
        meta: {
            uri
        }
    };
}
export function resourceSuccess(uri, data) {
    return {
        type: 'RESOURCE_SUCCEEDED',
        payload: data,
        meta: {
            uri
        }
    };
}

export function fetchResource(uri) {
    return (dispatch) => {
        dispatch(resourceIsLoading(uri));
        const request = new Request(location.href, {
            headers: new Headers({
                'Accept': 'application/json'
            })
        });
        fetch(request)
            .then(response => response.json())
            .then(json => jsonld.compact(
                json,
                context,
                (err, compacted) => err ? dispatch(resourceFailed(uri, err)) : dispatch(resourceSuccess(uri, compacted))));
    };
}




export default (state, action) => {
    switch (action.type) {
        case 'RESOURCE_SUCCEEDED':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}