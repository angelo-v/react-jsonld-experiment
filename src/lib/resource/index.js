import React from 'react';
import { connect } from 'react-redux';

import Spinner from 'react-spinkit';

export default (Component) => {

    const Resource = (props) => {
        console.log("Resource", Component.name, props.uri);
        return props.loading ? <Spinner />
            : <Component {...props} />
    };

    return connect((state, ownProps) => {
        const self = state[ownProps.uri];
        return self ? {
            ...self
        } : { loading: true }
    })(Resource);

}