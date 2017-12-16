import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchResource } from '../resources'

import ArticlePreview from './ArticlePreview';

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
            <div>Loading <a href={this.props.uri}>{this.props.uri}</a> automatically</div>
        ) : (
            <div>
                {this.props.content.map(uri => <ArticlePreview uri={uri} />)}
            </div>
        )}
        </div>
    }
}


export default connect((state, ownProps) => {
    const self = state["@graph"].find(res => res["@id"] === ownProps.uri);
    return self ? {
        ...self
    } : { loading: true }
}, { fetchResource })(ArticleList);