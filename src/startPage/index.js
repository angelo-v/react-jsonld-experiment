
import React  from "react";
import { NavItem } from "../navigation";
import { ArticleList } from "../articles";


export default (props) => (<div>
    <ul>
        {props.navigation.map(
            (nav) => <NavItem key={nav} uri={nav} />
        )}
    </ul>
    <ArticleList uri={props.articleList} />
</div>)