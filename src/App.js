import "./App.css";
import { useState, useEffect, useRef } from "react";

import Sphere from "./components/Sphere";
import { Line, Line3DWithShadow } from "./components/Lines";
import { ClipPaths_1 } from "./components/ClipPaths";

import {
  SlideInPage_opTls,
  SlideInPage_routePlanner,
} from "./components/SlideInPage";
import Draggable from "react-draggable";

function App() {
  const [client, setClient] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  }); //client window

  const [globalProp, setGlobalProp] = useState({
    primary: {
      size: "250",
      fontSize: "36",
    },
    secondary: {
      size: "230",
      fontSize: "28",
    },
    tertiary: {
      size: "200",
      fontSize: "20",
    },
  });

  const spheres = [
    {
      id: 1,
      size: globalProp.primary.size,
      title: "Logistics",
      top: 300,
      left: client.width / 50,
      fontSize: globalProp.primary.fontSize,
      displayable: false,
    },
    {
      id: 2,
      size: globalProp.primary.size,
      title: "Interactive Art",
      top: (client.height * 3) / 4,
      left: client.width - globalProp.primary.size,
      fontSize: globalProp.primary.fontSize,
      displayable: false,
    },
    {
      id: 3,
      size: globalProp.primary.size,
      title: "Fitness & Health",
      top: client.height,
      left: client.width / 2,
      fontSize: globalProp.primary.fontSize,
      displayable: false,
    },
    {
      id: 4,
      size: globalProp.primary.size,
      title: "Web Dev",
      top: client.height / 1.5,
      left: client.width / 2 - client.width / 6,
      fontSize: globalProp.primary.fontSize,
      displayable: false,
    },
    {
      id: 5,
      size: globalProp.primary.size,
      title: "Robotic Dev",
      top: client.height / 3 - 10,
      left: client.width / 2 + client.width / 4 + 100,
      fontSize: globalProp.primary.fontSize,
      displayable: false,
    },
    {
      id: 6,
      size: globalProp.secondary.size,
      title: "Route Planner",
      top: client.height / 2,
      left: client.width / 2,
      fontSize: globalProp.secondary.fontSize,
      displayable: true,
    },
    {
      id: 7,
      size: globalProp.secondary.size,
      title: "Operation Tools",
      top: client.height / 1.5,
      left: client.width / 15,
      fontSize: globalProp.secondary.fontSize,
      displayable: true,
    },
  ];

  const [selectedSpheres, setSelectedSpheres] = useState([]);
  const prevSelectedSpheresRef = useRef([]);

  const [slidingPageActive, setSlidingPageActive] = useState({});

  //Contexts

  const [Page_opTls, setPage_opTls] = useState({
    left: ` ${spheres[6].left} + ${spheres[6].size}`,
    // offPt: client.width + client.width * 0.1,
    tsfomOffset_rotateY: 0,
    tsfomOffset_translateX: 0,
    mainPageTranAnim: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setClient({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    /*
      Slide-in page attributes control for the transformation
     */
    if (
      prevSelectedSpheresRef.current.includes("Operation Tools") ||
      prevSelectedSpheresRef.current.includes("Route Planner")
    ) {
      setPage_opTls({ tsfomOffset_rotateY: 0, mainPageTranAnim: false });
    }

    prevSelectedSpheresRef.current = selectedSpheres;

    //Pop up slide-in page when click the according spheres
    if (
      selectedSpheres.includes("Operation Tools") ||
      selectedSpheres.includes("Route Planner")
    ) {
      //Slide in page activating
      // Calculate the target position: 10% of window height
      const targetPosition = window.innerHeight * 0.1;
      // Set the transform style
      setSlidingPageActive({
        transform: `translateY(${targetPosition}px)`,
      });

      // if (Page_opTls.tsfomOffset_rotateY === 0) {

      // } else {
      //   setPage_opTls({ tsfomOffset_rotateY: 0 });
      // }
      // console.log(Page_opTls.tsfomOffset_rotateY);
      // setPage_opTls({ tsfomOffset_translateX: -100 });
      setPage_opTls({ tsfomOffset_rotateY: 35, mainPageTranAnim: true });
      // setPage_opTls((prev) => ({
      //   ...prev,
      //   tsfomOffset_rotateY: prev.tsfomOffset_rotateY === 0 ? 30 : 0,
      // }));
    }

    // console.log("!!!" + selectedSpheres);
  }, [selectedSpheres]);

  const handleSphereClick = (sphere) => {
    //Regular basic click on/off
    // setSelectedSpheres((prevSelected) => {
    //   if (prevSelected.includes(title)) {
    //     // If sphere is already selected, deselect it
    //     return prevSelected.filter((sphereTitle) => sphereTitle !== title);
    //   } else {
    //     // Add sphere to the selected list
    //     return [...prevSelected, title];
    //   }
    // });

    setSelectedSpheres((prevSelected) => {
      //Check if there is already a sphere with displayable: true
      const existingIndex = prevSelected.findIndex(
        (sphere) => sphere.displayable === true
      );

      console.log(existingIndex, selectedSpheres);

      if (prevSelected.includes(sphere.title)) {
        // If sphere is already selected, deselect it
        return prevSelected.filter(
          (sphereTitle) => sphereTitle !== sphere.title
        );
      } else {
        // Add sphere to the selected list
        return [...prevSelected, sphere.title];
      }
    });
  };

  const operationToolSphere = spheres.find(
    (s) => s.title === "Operation Tools"
  );

  return (
    <>
      {/* <ClipPaths_1></ClipPaths_1> */}
      <div className={"CONTAINER"}>
        <div
          className={"CONTENTs"}
          style={{
            transform: `perspective(1000px) rotateY(${Page_opTls.tsfomOffset_rotateY}deg`,
            transformOrigin: "0 50%",
            zIndex: "1",
            background: `repeating-linear-gradient(180deg, 
              #dbdbdb 0%, 
              #b5b5b5 22%,
              #d8d8d8 44%, 
              #b5b5b5 66%, 
              #dbdbdb 100%)`,
            // clipPath: `path("M0,500 Q5,300 500,100 T1000,50 T1500,50 T20000,50")`,

            // animation: "clipPathAnimation 5s infinite",

            transition:
              "transform 2s ease-in-out, box-shadow 0.3s ease-in-out, animation 0.3s ease-in-out",
          }}
        >
          <Line
            key={"Logistics-WebDev"}
            x1={spheres[0].size / 2}
            y1={spheres[0].size / 2}
            x2={spheres[3].left + spheres[3].size / 2}
            y2={spheres[3].top - spheres[3].size / 2}
          ></Line>
          <Line
            key={"Logistics - RoboticDev"}
            x1={spheres[0].size / 2}
            y1={spheres[0].size / 2}
            x2={spheres[4].left + spheres[4].size / 2}
            y2={spheres[4].top - spheres[4].size / 2}
          ></Line>
          <Line
            key={"IArt - WebDev"}
            x1={spheres[1].left + spheres[1].size / 2}
            y1={spheres[1].top - spheres[1].size / 2}
            x2={spheres[3].left + spheres[3].size / 2}
            y2={spheres[3].top - spheres[3].size / 2}
          ></Line>
          <Line
            key={"IArt - RoboticDev"}
            x1={spheres[1].left + spheres[1].size / 2}
            y1={spheres[1].top - spheres[1].size / 2}
            x2={spheres[4].left + spheres[4].size / 2}
            y2={spheres[4].top - spheres[4].size / 2}
          ></Line>
          <Line
            key={"FH - WebDev"}
            x1={spheres[2].left + spheres[2].size / 2}
            y1={spheres[2].top - spheres[2].size / 2}
            x2={spheres[3].left + spheres[3].size / 2}
            y2={spheres[3].top - spheres[3].size / 2}
          ></Line>
          <Line
            key={"FH - RoboticDev"}
            x1={spheres[2].left + spheres[2].size / 2}
            y1={spheres[2].top - spheres[2].size / 2}
            x2={spheres[4].left + spheres[4].size / 2}
            y2={spheres[4].top - spheres[4].size / 2}
          ></Line>
          <Line
            key={"WebDev-OpTools"}
            x1={spheres[3].left + spheres[3].size / 2}
            y1={spheres[6].top - spheres[6].size / 2}
            x2={spheres[5].left + spheres[5].size / 2}
            y2={spheres[5].top - spheres[5].size / 2}
            display={
              selectedSpheres.includes("Web Dev") &&
              selectedSpheres.includes("Logistics")
                ? "block"
                : "none"
            }
          ></Line>
          <Line
            key={"WebDev-RPlanner"}
            x1={spheres[6].left + spheres[6].size / 2}
            y1={spheres[6].top - spheres[6].size / 2}
            x2={spheres[3].left + spheres[3].size / 2}
            y2={spheres[3].top - spheres[3].size / 2}
            display={
              selectedSpheres.includes("Web Dev") &&
              selectedSpheres.includes("Logistics")
                ? "block"
                : "none"
            }
          ></Line>
          {spheres.map((sphere, index) => (
            <Sphere
              key={sphere.id}
              size={sphere.size}
              title={sphere.title}
              top={sphere.top}
              left={sphere.left}
              state={{
                original: index < 5 ? "original" : "",
                scnd_display:
                  (sphere.title === "Operation Tools" &&
                    selectedSpheres.includes("Web Dev") &&
                    selectedSpheres.includes("Logistics")) ||
                  (sphere.title === "Route Planner" &&
                    selectedSpheres.includes("Web Dev") &&
                    selectedSpheres.includes("Logistics"))
                    ? "selected_scnd"
                    : "",
                selected: selectedSpheres.includes(sphere.title)
                  ? "selected"
                  : "",
              }}
              fontSize={sphere.fontSize}
              // opacity={
              //   index < 5 ||
              //   (sphere.title === "Operation Tools" &&
              //     selectedSpheres.includes("Web Dev") &&
              //     selectedSpheres.includes("Logistics")) ||
              //   (sphere.title === "Route Planner" &&
              //     selectedSpheres.includes("Web Dev") &&
              //     selectedSpheres.includes("Logistics"))
              //     ? "1"
              //     : "0"
              // }
              selected={selectedSpheres.includes(sphere.title)} //Global "selected", for essential layout design
              onClick={() => {
                handleSphereClick(sphere);
              }}
            />
          ))}{" "}
        </div>

        <div className="slideInpages-container">
          {" "}
          <SlideInPage_opTls
            isOpen={selectedSpheres.includes("Operation Tools") ? true : false}
            onCloseBtn={(value) => {
              /*
          Receiving signal from closeBtn on the slide-in page,
           if closeBtn get clicked,
           to remove the according highlight on the Main page
          */
              if (!value) {
                setSelectedSpheres((prevSelected) =>
                  prevSelected.filter(
                    (sphereTitle) => sphereTitle !== "Operation Tools"
                  )
                );
              }
            }}
          />
          <SlideInPage_routePlanner
            isOpen={selectedSpheres.includes("Route Planner") ? true : false}
            onCloseBtn={(value) => {
              /*
          Receiving signal from closeBtn on the slide-in page,
           if closeBtn get clicked,
           to remove the according highlight on the Main page
          */
              if (!value) {
                setSelectedSpheres((prevSelected) =>
                  prevSelected.filter(
                    (sphereTitle) => sphereTitle !== "Operation Tools"
                  )
                );
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

// const SlideInPage = ({ active, style_left, style_height, style_width }) => {
//   return (
//     <div
//       className="slide-in-page"
//       style={{
//         position: "absolute",

//         left: `${style_left}px`,
//         height: `${style_height}px`,
//         width: `${style_width}px`,
//         transition: "transform 0.5s ease-in-out", // Ensure transform transition is applied here
//         transform:
//           style_left !== 0 ? `translateX(${style_left}px)` : "translateX(0)",
//       }}
//     >
//       This is the sliding page!
//     </div>
//   );
// };

export default App;
