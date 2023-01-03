import React from "react";
import Image from "next/image";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

import PowerIcon from "./images/PowerIcon";
// @ts-ignore
import avatar from "./images/logo.svg";
import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <Navbar className={styles.header}>
      <div className={`d-print-none ${styles.root}`}>
        <Nav className="ml-md-0">
          <NavItem className="d-flex align-items-center">
            <span
              className={`${styles.avatar} rounded-circle thumb-sm float-left`}
            >
              {/*<img alt="Logo" src={avatar} style={{ width: 45, height: 45, backgroundColor: 'rgb(54 32 93)', marginRight: '10px', verticalAlign: 'text-bottom' }}/>*/}
            </span>
            <span className={`small d-sm-down-none ${styles.accountCheck}`}>
              Philip smith
            </span>
          </NavItem>

          <NavItem className={`${styles.divider} d-none d-sm-block`} />

          <NavItem>
            <NavLink className={`${styles.navItem} text-white`} href="#">
              <PowerIcon className={styles.headerIcon} />
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
};
