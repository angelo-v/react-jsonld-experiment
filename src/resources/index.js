import * as jsonld from 'jsonld';

const context = {
    "@language": "en",
    "title": "http://www.w3.org/1999/02/22-rdf-syntax-ns#title",
    "description": "http://www.w3.org/1999/02/22-rdf-syntax-ns#description",
    "content": {
        "@id": "http://schema.example/list#content",
        "@type": "@id"
    },
    "articleList": {
        "@id": "http://schema.example/blog/articleList",
        "@type": "@id"
    },
    "navigation": {
        "@id": "http://schema.example/blog/navigation",
        "@type": "@id"
    },
    "author": {
        "@id": "http://schema.example/blog/author",
        "@type": "@id"
    },
    "type": {
        "@id": "http://schema.example/blog/type"
    },
    "name": "http://xmlns.com/foaf/0.1/name",
    "picture": {"@id": "http://xmlns.com/foaf/0.1/picture", "@type": "@id"}
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
        const request = new Request(uri, {
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
                ["@graph"]: [
                    ...state["@graph"],
                    ...action.payload["@graph"]
                ]
            };
        default:
            return state
    }
}