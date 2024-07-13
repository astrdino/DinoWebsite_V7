import React from "react";
import { useState, useEffect, useRef } from "react";
import "../components_style.css";

import { Buttons_ClosePage } from "./Buttons";

const SlideInPage_opTls = ({ isOpen, onCloseBtn }) => {
  /* The display of slide-in page is controlled by either close btn on the page or the sphere selecton */

  /*
    "isOpen" -> signal from the parent page
    "isPageOpen" -> signal to manage "this" page dispaly
  */

  const [isPageOpen, setIsPageOpen] = useState(false);
  const [getFromBtn, setGetfromBtn] = useState(null);
  const thisComponentRef = useRef(null); //Attach to "self" main container

  //Styles
  const slideInPageActiveStyle = {
    visibility: "visible",
    position: "absolute",
    right: "0",
    width: "50%",
    opacity: "0.8",
    left: "45%",
    top: "-1000px",

    marginRight: "4em",
  };

  const handleSignalfromBtn = (value) => {
    setGetfromBtn(value);
    onCloseBtn(value); // Send the value back to the parent
  };

  useEffect(() => {
    setIsPageOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsPageOpen(getFromBtn);
  }, [getFromBtn]);

  useEffect(() => {
    //Get self height
    if (thisComponentRef.current) {
      const height = thisComponentRef.current.offsetHeight;
      console.log("Component height:", height);
    }
  }, [isPageOpen]);

  return (
    <div
      ref={thisComponentRef}
      className="slide-in-page"
      style={isPageOpen ? slideInPageActiveStyle : {}}
    >
      <Buttons_ClosePage child2Parent={handleSignalfromBtn}></Buttons_ClosePage>

      <div className="slide-in-page__content">
        <h1>Sliding Page OT</h1>

        <p>This page slides in from the right!</p>
        <p>Lt of information add in </p>
      </div>
    </div>
  );
};

const SlideInPage_routePlanner = ({ isOpen, onCloseBtn }) => {
  /* The display of slide-in page is controlled by either close btn on the page or the sphere selecton */

  /*
    "isOpen" -> signal from the parent page
    "isPageOpen" -> signal to manage "this" page dispaly
  */

  const [isPageOpen, setIsPageOpen] = useState(false);
  const [getFromBtn, setGetfromBtn] = useState(null);
  const thisComponentRef = useRef(null); //Attach to "self" main container

  //Styles
  const slideInPageActiveStyle = {
    visibility: "visible",
    position: "absolute",
    right: "0",
    width: "50%",
    opacity: "0.8",
    left: "45%",
    top: "-1000px",

    marginRight: "4em",
  };

  const handleSignalfromBtn = (value) => {
    setGetfromBtn(value);
    onCloseBtn(value); // Send the value back to the parent
  };

  useEffect(() => {
    setIsPageOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsPageOpen(getFromBtn);
  }, [getFromBtn]);
  useEffect(() => {
    //Get self height
    if (thisComponentRef.current) {
      const height = thisComponentRef.current.offsetHeight;
      console.log("Component height:", height);
    }
  }, [isPageOpen]);

  return (
    <div
      ref={thisComponentRef}
      className="slide-in-page"
      style={isPageOpen ? slideInPageActiveStyle : {}}
    >
      <Buttons_ClosePage child2Parent={handleSignalfromBtn}></Buttons_ClosePage>

      <div className="slide-in-page__content">
        <h1>Sliding Page RP</h1>

        <p>This page slides in from the right!</p>
        <p>This page slides in from the right!</p>
        <p>This page slides in from the right!</p>
        <p>This page slides in from the right!</p>
        <p>This page slides in from the right!</p>
        <p>This page slides in from the right!</p>
      </div>
    </div>
  );
};
export { SlideInPage_opTls, SlideInPage_routePlanner };
