import React  from 'react';
import { connect } from 'react-redux'
import { Link } from '../lib';

const ArticlePreview = ({ uri, title, description }) => <div>
    <h2><Link to={uri}>{title}</Link></h2>
    <p>
        {description}
    </p>
</div>;

export default connect((state, ownProps) => {
    const self = state[ownProps.uri];
    return self ? {
        ...self
    } : { loading: true }
})(ArticlePreview);