import React from "react";
import { useState,useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Size from "./Size";
import "react-lazy-load-image-component/src/effects/blur.css";

const Cards = ({ person }) => {
  const [width450, setWidth450] = useState(false);
  const [width550, setWidth550] = useState(false);
  const [width720, setWidth720] = useState(false);

  const getScreenWidth = (width) => {
    if (width <= 450) {
      if (width450 === false) setWidth450(true);
      if (width550 === true) setWidth550(false);
      if (width720 === true) setWidth720(false);
    } else if (width > 450 && width <= 550) {
      if (width450 === true) setWidth450(false);
      if (width550 === false) setWidth550(true);
      if (width720 === true) setWidth720(false);
    } else if (width > 550 && width <= 720) {
      if (width450 === true) setWidth450(false);
      if (width550 === true) setWidth550(false);
      if (width720 === false) setWidth720(true);
    } else {
      if (width450 === true) setWidth450(false);
      if (width550 === true) setWidth550(false);
      if (width720 === true) setWidth720(false);
    }
  };

  return (
    <div>
      <Size getScreenWidth={getScreenWidth} />
      <table>
        <tbody>
          <tr>
            <td style={{ width: "40px" }}>
              <LazyLoadImage
                src={person.image}
                alt="image"
                effect="blur"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </td>
            <td style={{ width: "250px", paddingLeft: "20px" }}>
              {person.name}
            </td>
            <td
              style={{
                width: !width720 ? "150px" : !width550 ? "110px" : "80px",
              }}
            ></td>
            <td
              style={{
                color:
                  person.status.toUpperCase() === "ALIVE"
                    ? "green"
                    : person.status.toUpperCase() === "DEAD"
                    ? "red"
                    : "grey",
              }}
            >
              &#9679;
            </td>
            {!width450 && (
              <td style={{ paddingLeft: "10px" }}>
                {width720 &&
                  !width550 &&
                  person.status.charAt(0).toUpperCase() +
                    person.status.slice(1)}
                {!width720 && !width550 && (
                  <>
                    {" "}
                    {person.status.charAt(0).toUpperCase() +
                      person.status.slice(1)}{" "}
                    - {person.species}{" "}
                  </>
                )}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cards;
