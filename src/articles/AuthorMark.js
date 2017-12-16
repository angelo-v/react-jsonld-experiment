import React  from 'react';
import { connect } from 'react-redux'


const AuthorMark = ({ uri, name, picture }) => <div>
    <img width={100} src={picture} />
    <em><a href={uri}>{name}</a></em>
</div>;

export default connect((state, ownProps) => {
    const self = state["@graph"].find(res => res["@id"] === ownProps.uri);
    return self ? {
        ...self
    } : { loading: true }
})(AuthorMark);