import React  from 'react';
import { connect } from 'react-redux'
import { Link } from '../lib';

const AuthorMark = ({ loading, uri, name, picture }) => loading ? "LOADING AUTHOR" : <div>
    <img width={100} src={picture} />
    <em><Link to={uri}>{name}</Link></em>
</div>;

export default connect((state, ownProps) => {
    const self = state[ownProps.uri];
    return self ? {
        ...self
    } : { loading: true }
})(AuthorMark);