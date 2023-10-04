import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faAddressCard,
  faCircleInfo,
  faPersonChalkboard,
  faBoxArchive,
  faGraduationCap,
  faRightFromBracket,
  faPlug,
} from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  const authUser = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  return (
    <nav>
      <ul className="side left-side">
        <NavLink
          id="home"
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end
        >
          <FontAwesomeIcon icon={faHouse} /> Home
        </NavLink>

        <NavLink
          to="contact"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <FontAwesomeIcon icon={faAddressCard} /> Contact
        </NavLink>

        <NavLink
          to="about"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
          About
        </NavLink>

        {isAuthenticated() && (
          <NavLink
            to="presentation"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FontAwesomeIcon icon={faPersonChalkboard} /> new Lecture
          </NavLink>
        )}

        {isAuthenticated() && (
          <NavLink
            to="activePresentations"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FontAwesomeIcon icon={faBoxArchive} /> Active Lectures
          </NavLink>
        )}
      </ul>

      <ul className="side right-side">
        {isAuthenticated() && (
          <p id="user-name">{"Hello " + authUser().firstName}</p>
        )}

        {isAuthenticated() && (
          <NavLink
            id="joinALecture"
            to="joinALecture"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Join a lecture
          </NavLink>
        )}

        {isAuthenticated() && (
          <NavLink
            to="signOut"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
          </NavLink>
        )}

        {!isAuthenticated() && (
          <NavLink
            id="sign-up"
            to="register"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FontAwesomeIcon icon={faGraduationCap} /> Sign Up
          </NavLink>
        )}

        {!isAuthenticated() && (
          <NavLink
            to="login"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FontAwesomeIcon icon={faPlug} /> Log in
          </NavLink>
        )}
      </ul>
    </nav>
    // {isAuthenticated() && (
    //   <div className="user-greeting">Hello {authUser().firstName}</div>
    // )}
  );
};

export default NavigationBar;
