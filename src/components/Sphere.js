import React, { useState, useRef, useEffect } from "react";
import "../components_style.css";

const Sphere = ({
  size,
  title,
  top,
  left,
  state,
  fontSize,
  onClick,
  selected,
  // opacity,
}) => {
  const radius = size / 2;
  const textRadius = 80; // Radius for the text path

  //Carried interactive events in individual sphere
  const [EVENTs, setEVENTs] = useState({
    display: state.original ? "1" : "0",
    emerge: state.original,
    larger: false,
  });

  //Dragging
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    console.log(dragStart.current);
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    dragStart.current = { x: e.clientX, y: e.clientY };

    //Remove from "selected" because user moves the sphere
    setEVENTs((prev) => ({
      emerge: false,
      ...prev,
    }));
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  // useEffect(() => {
  //   setEVENTs({
  //     display: state.original ? "1" : "0",
  //     emerge: selected,
  //     larger: false,
  //   });
  // }, [selected]);

  // useEffect(() => {
  //   setEVENTs({
  //     display: state.original ? "1" : "0",
  //     emerge: selected,
  //     larger: false,
  //   });
  //   console.log(state.original);
  //   console.log(EVENTs.display);
  // }, [state.original]);
  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   console.log("state.original:", state.original);
  //   setEVENTs((prev) => ({
  //     ...prev,
  //     display: state.original ? "1" : "0",
  //     emerge: selected,
  //   }));
  //   console.log("EVENTs.display:", EVENTs.display);
  // }, [selected, state.original]);
  // useEffect(() => {
  //   console.log("EVENTs.display (updated):", EVENTs.display);
  // }, [EVENTs.display]);

  useEffect(() => {
    // console.log(state.scnd_display);
    console.log(title);
  }, [state.scnd_display]);
  useEffect(() => {
    console.log(state.original);
  }, [state.original]);

  return (
    <div
      className={`Sphere  ${state.original}  ${
        state.scnd_display ? "selected_scnd" : ""
      } ${state.selected ? "selected" : ""} `}
      // className={`Sphere  ${state.original ? "original" : ""}  `}
      style={{
        position: "absolute",
        top: `${top - size}px`,
        left: `${left}px`,
        zIndex: 100,

        // opacity: state.original,
      }}
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseEnter={() => {
          console.log("entering");
        }}
        transform={`translate(${position.x}, ${position.y})`}
      >
        {/* Define a radial gradient */}
        <defs>
          <radialGradient
            id="grad1-afterClick"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" style={{ stopColor: "#fff", stopOpacity: 1 }} />
            <stop
              offset="60%"
              style={{ stopColor: "#eeeeee", stopOpacity: 1 }}
            />
          </radialGradient>
          <radialGradient
            id="grad2-sub"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#cd4b0d", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#ffff", stopOpacity: 0.8 }}
            />

            <stop
              offset="100%"
              style={{ stopColor: "#ffff", stopOpacity: 1 }}
            />
          </radialGradient>

          {/* Define the path for the text */}
          <path
            id="textPath"
            d={`M 100,100 m ${textRadius},0 a ${textRadius},${textRadius} 0 1,1 -${
              textRadius * 2
            },0 a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0`}
          />
        </defs>
        {/* Draw the circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="url(#grad1-afterClick)"
          opacity={EVENTs.emerge ? "1" : "0"}
          className="gradient-circle"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="url(#grad2-sub)"
          opacity={EVENTs.emerge ? "0" : "1"}
          className="gradient-circle"
        />

        <text
          x="100" // Center horizontally
          y="100" // Center vertically
          fill="#ea7413"
          fontSize={fontSize}
          textAnchor="middle" // Horizontally center text
          dominantBaseline="middle" // Vertically center text
          fontWeight="550"

          // stroke="black"
          // fill="white"
        >
          <textPath
            href="#textPath"
            startOffset="50%" // Start text in the middle of the path
            textAnchor="middle" // Center text along the path
          >
            {title}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default Sphere;
