import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Wealth_Health from "../../assets/img/Wealth_Health.webp";
import "./Header.css";
import { loadTheme, toggleTheme } from "../../utils/darkTheme";

/* Header component serves as primary navigation bar for application.        **
 **                                                                           **
 ** It adapts to different screen sizes, with responsive design that includes **
 ** mobile-friendly navigation toggle. State 'isMobile' determines if         **
 ** navigation should switch to a mobile view based on screen width.          **
 **                                                                           **
 ** 'isMobileNavVisible' manages visibility of navigation menu in mobile      **
 ** view, toggling between open and closed states.                            **
 **                                                                           **
 ** Component initializes with 'loadTheme' function to set theme based        **
 ** on user preferences stored in localStorage. Theme can be toggled between  **
 ** light and dark modes using 'toggleTheme' function, with an icon change    **
 ** reflecting current mode.                                                  **
 **                                                                           **
 ** For mobile view, a burger menu icon is displayed, which expands to show   **
 ** navigation options when clicked. Navigation bar also includes a link to   **
 ** view employee list and a button to toggle the theme.                      */

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 485);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  useEffect(() => {
    loadTheme();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 485);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentTheme = localStorage.getItem("theme");

  return (
    <header className="header">
      {isMobile && (
        <button
          aria-label={isMobileNavVisible ? "Close menu" : "Open menu"}
          className="mobile-nav-toggle"
          onClick={() => setIsMobileNavVisible(!isMobileNavVisible)}
        >
          <FontAwesomeIcon icon={isMobileNavVisible ? faTimes : faBars} />
        </button>
      )}

      <nav
        className={`navigation ${isMobile && isMobileNavVisible ? "show" : ""}`}
      >
        <Link to="/" className="logo">
          <img src={Wealth_Health} alt="Wealth Health logo" />
          <span>{isMobile ? "WHealth" : "Wealth Health"}</span>
        </Link>
        <div className="title">
          <h1>HRnet</h1>
        </div>
        {isMobile ? (
          <Link
            to="/employee-list"
            className="nav-link"
            aria-label="Employee list"
          >
            <FontAwesomeIcon icon={faUserGroup} />
            <span className="title-2">Employee</span>
          </Link>
        ) : (
          <Link className="title-2" to="/employee-list">
            View Employees
          </Link>
        )}
        <button
          aria-label={
            currentTheme === "dark"
              ? "Activate light mode"
              : "Activate dark mode"
          }
          className="fa-icon"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={currentTheme === "dark" ? faSun : faMoon} />
        </button>
      </nav>
    </header>
  );
};

export default Header;