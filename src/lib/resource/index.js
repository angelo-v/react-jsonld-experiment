import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from 'react-spinkit';

import { fetchResource } from '../../resources'

export default (WrappedComponent, options = { fetch: false }) => {

    class Resource extends Component {

        componentDidMount() {
            if (options.fetch) {
                console.log("eager fetching", this.props.uri);
                this.props.fetchResource(this.props.uri);
            }
        }

        render() {
            console.log("Resource", WrappedComponent.name, this.props.uri);
            return this.props.loading ? <Spinner />
                : <WrappedComponent {...this.props} />
        }
    }

    return connect((state, ownProps) => {
        const self = state[ownProps.uri];
        return self ? {
            ...self
        } : { loading: true }
    }, { fetchResource })(Resource);

}