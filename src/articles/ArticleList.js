import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchResource } from '../resources'

import ArticlePreview from './ArticlePreview';

import Spinner from 'react-spinkit';

class ArticleList extends Component {

    componentDidMount() {
        if (this.props.loading) {
            this.props.fetchResource(this.props.uri);
        }
    }

    render() {
        return <div>
            <h1>{this.props.title}</h1>
            {this.props.loading ? (
                <Spinner />
        ) : (
            <div>
                {this.props.content.map(uri => <ArticlePreview key={uri} uri={uri} />)}
            </div>
        )}
        </div>
    }
}

export default connect((state, ownProps) => {
    const self = state[ownProps.uri];
    return self ? {
        ...self
    } : { loading: true }
}, { fetchResource })(ArticleList);