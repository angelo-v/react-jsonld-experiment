import React  from 'react';
import { connect } from 'react-redux'

import AuthorMark from './AuthorMark';

const Article = ({ uri, title, description, author }) => <div>
    <h2><a href={uri}>{title}</a></h2>
    <p>
        {description}
    </p>
    <AuthorMark uri={author} />
</div>;

export default connect((state, ownProps) => {
    const self = state[ownProps.uri];
    return self ? {
        ...self
    } : { loading: true }
})(Article);