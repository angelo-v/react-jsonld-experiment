import React  from 'react';
import { connect } from 'react-redux'


const ArticlePreview = ({ uri, title }) => <li><a href={uri}>{title}</a></li>;

export default connect((state, ownProps) => {
    const self = state["@graph"].find(res => res["@id"] === ownProps.uri);
    return self ? {
        ...self
    } : { loading: true }
})(ArticlePreview);