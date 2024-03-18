import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
//Link tag use for nevigate page to page one when user click it.
const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">
          <span style={{ color: "green" }}>JerryKickStart</span>|CrowdFunding
        </a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaign</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
