import react from "react";
import "../components_style.css";

const Line = ({ key, x1, y1, x2, y2, display }) => {
  return (
    <div className={"Line"}>
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: display,
        }}
        className={"Line-Svg"}
      >
        <line
          key={key}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

const Line3DWithShadow = () => {
  return (
    <div className={"Line"}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Filter Definition for Shadow */}
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="4" dy="4" result="offsetblur" />
            <feFlood floodColor="rgba(0,0,0,0.5)" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Line with Shadow */}
        <line
          x1="50"
          y1="50"
          x2="150"
          y2="150"
          stroke="red"
          strokeWidth="4"
          filter="url(#shadow)"
        />
      </svg>
    </div>
  );
};

export { Line3DWithShadow, Line };
