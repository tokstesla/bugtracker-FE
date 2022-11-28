import { useRef } from "react";
import { Link } from "react-router-dom";
import service from "services/service";
import s from "./css/Homepage.module.sass";
import "./css/Homepage.sass";

function Homepage() {
  service.setPageTitle("Homepage");

  const ServicesRef = useRef(null);

  const sectionACardData = [
    {
      icon: "fa-solid fa-user-gear",
      title: "Account Creation",
      body: "Fill in the required details and click on the sign up button. Easy-peasy.",
    },
    {
      icon: "fa-solid fa-clock-rotate-left",
      title: "View Projects",
      body: "You will be able to see the projects and tickets you have been assigned to work on.",
    },
    {
      icon: "fa-solid fa-users",
      title: "Ticket Creation",
      body: "You can generate tickets for bugs found during projects and also make suggestions for features.",
    },
  ];

  const sectionDCardData = [
    {
      title: "Quality & Skill",
      content:
        "Our workers go through a thorough screening process & have ratings from former contractors to ensure the highest quality.",
    },
    {
      title: "Crew Flexibility",
      content:
        "BrickX allows you to add workers when needed & remove when project demands slow down.",
    },
    {
      title: "Dedicated Support",
      content:
        "Our team is dedicated to making sure your software is working smoothly.",
    },
    {
      title: "Saves You Time",
      content:
        "We conveniently get you workers while managing their hours & payroll, allowing you to focus on other areas of your business.",
    },
  ];

  const gotoGetStart = () =>
    window.scrollTo({
      top: ServicesRef.current.offsetTop,
      behavior: "smooth",
    });

  return (
    <div className={s.main_container} id="Homepage_Main_Container">
      <div className="con-container">
        <div className="img-bg">
          <img
            src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="overlay"></div>

        <div className="con-wrapper">
          <nav className="con-navbar d-flex align-items-center justify-content-between">
            <div className="con-left">
              <h3 className="logo">
                <Link to="/">Bug Tracker</Link>
              </h3>
            </div>

            <div className="con-right">
              <ul className="d-flex align-items-center">
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className="d-none d-lg-block">
                  <Link to={"/register"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="section-a d-flex align-items-center justify-content-center">
            <div className="con-top text-center">
              <h2>
              A scalable bug tracking system that assists you in managing bugs easily and delivering great products in time.
              </h2>
              <button className="header-btn" onClick={gotoGetStart}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="con-section" ref={ServicesRef}>
        <div className="section-b">
          <div className="header mb-5">
            <h2>How Bug Tracker works</h2>
          </div>
          <div className="con-card">
            {sectionACardData.map((elem, key) => (
              <div className="section-b-card" key={key}>
                <div className="icon">
                  <i className={`${elem.icon}`}></i>
                </div>
                <div className="title my-3">{elem.title}</div>
                <div className="body">{elem.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-c con-centered sections">
          <div className="d-lg-flex align-items-center">
            <div className="col-12 col-lg-6 mb-5 mb-lg-0">
              <div>
                <h1 className="title">Why Bug Tracker?</h1>
                <p className="body mb-5">
                As a web-based system where Bugs can be documented and managed, it is quickly accessible and easy to maintain.
                </p>

                <Link to="/register">
                  <div className="homepage-btn">Start</div>
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="img">
                <img
                  src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="con-footer">
        <div className="footer d-lg-flex align-items-start justify-content-center gap-5">
          <div className="mb-4 mb-lg-0">
            &copy; {new Date().getFullYear()}
            &nbsp; Interswitch Bug Tracker.
          </div>
          <div className="d-lg-flex align-items-start gap-5">
            <ul className="mb-5 mb-lg-0">
              <li>
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
              
            </ul>
            <ul className="mb-5 mb-lg-0">
              <li>
                <Link to="/">API</Link>
              </li>
              <li>
                <Link to="/">Training</Link>
              </li>
              <li>
                <Link to="/">Security</Link>
              </li>
            </ul>
              
            <ul>
            <li>
                <Link to="/">Pricing</Link>
              </li>
              <li>
                <Link to="/">Privacy</Link>
              </li>
              <li>
                <Link to="/">Docs</Link>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
