import React from "react";

import connectResource from "../lib";

const NavItem = ({ uri, title }) => <li><a href={uri}>{title}</a></li>;

export default connectResource(NavItem);