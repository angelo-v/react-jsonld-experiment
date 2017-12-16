import React from "react";
import connectResource, { Link } from "../lib";

const ArticlePreview = ({ uri, title, description }) => <div>
    <h2><Link to={uri}>{title}</Link></h2>
    <p>
        {description}
    </p>
</div>;

export default connectResource(ArticlePreview);