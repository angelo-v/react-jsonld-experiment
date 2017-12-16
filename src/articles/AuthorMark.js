import React from "react";
import connectResource, { Link } from "../lib";

const AuthorMark = ({ uri, name, picture }) =>
     <div>
        <img width={100} src={picture} />
        <em><Link to={uri}>{name}</Link></em>
    </div>;

export default connectResource(AuthorMark);