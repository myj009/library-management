// eslint-disable-file @typescript-eslint/no-explicit-any
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/header.module.css";

interface CustomLinkProps {
  to: string;
  children: ReactNode; // Specify the type as ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, ...props }) => {
  const path = window.location.pathname;
  return (
    <li className={path === to ? styles.active : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default CustomLink;
