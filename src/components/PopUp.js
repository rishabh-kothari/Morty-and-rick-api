import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Cards from "./Card";
import Size from "./Size";
import { useState,useRef } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopUp = ({ person }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [width470, setWidth470] = useState(false);
  const [width320, setWidth320] = useState(false);

  const getScreenWidth = (width) => {
    if (width <= 470 && width470 === false) {
      setWidth470(true);
    } else if (width > 470 && width470 === true) {
      setWidth470(false);
    }
    if (width <= 320 && width320 === false) {
      setWidth320(true);
    } else if (width > 320 && width320 === true) {
      setWidth320(false);
    }
  };

  return (
    <div>
      <Size getScreenWidth={getScreenWidth} />
      <div onClick={handleClickOpen}>
        <Cards person={person} />
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <table>
            <tbody>
              <tr>
                <td
                  style={{
                    paddingLeft: width470 ? "4px" : "10px",
                    width: width470 ? "50px" : "70px",
                  }}
                >
                  <LazyLoadImage
                    src={person.image}
                    alt="image"
                    effect="blur"
                    style={{
                      borderRadius: "50%",
                      width: width470 ? "70px" : "80px",
                      height: width470 ? "70px" : "80px",
                    }}
                  />
                </td>
                <td style={{ width: width470 ? "15px" : "30px" }}></td>
                <td>
                  <ul>
                    <li>
                      <DialogActions>
                        <span
                          onClick={handleClose}
                          style={{
                            cursor: "pointer",
                            fontSize: width470 ? "29px" : "40px",
                            position: "absolute",
                            top: "1%",
                            right: "2%",
                          }}
                        >
                          &times;
                        </span>
                      </DialogActions>
                      <h4
                        style={{
                          paddingLeft: width470 ? "20px" : "5px",
                          fontWeight: "600",
                        }}
                      >
                        {person.name}
                      </h4>
                    </li>
                    <li>
                      <td
                        style={{
                          paddingLeft: width470 ? "20px" : "5px",
                          fontSize: "22px",
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
                      <td style={{ paddingLeft: "15px" }}>
                        <h6>
                          {person.status.charAt(0).toUpperCase() +
                            person.status.slice(1)}
                        </h6>
                      </td>
                      <td style={{ paddingLeft: "5px" }}>
                        <h6>-</h6>
                      </td>
                      <td
                        style={{
                          paddingLeft: width320 ? "50px" : "5px",
                          display: width320 && "block",
                        }}
                      >
                        <h6>{person.species}</h6>
                      </td>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </DialogTitle>
        <DialogContent>
          <table class="modal-table">
            <thead>
              <tr>
                <td style={{ paddingLeft: width470 ? "0px" : "20px" }}>
                  Gender
                </td>
                <td style={{ width: width470 ? "50px" : "150px" }}></td>
                <td style={{ paddingLeft: width470 ? "5px" : "20px" }}>
                  Location
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ paddingLeft: width470 ? "0px" : "20px" }}>
                  {person.gender.charAt(0).toUpperCase() +
                    person.gender.slice(1)}
                </td>
                <td style={{ width: width470 ? "50px" : "150px" }}></td>
                <td style={{ paddingLeft: width470 ? "5px" : "20px" }}>
                  {person.location.name.charAt(0).toUpperCase() +
                    person.location.name.slice(1)}
                </td>
              </tr>
              <tr style={{ height: "30px" }}></tr>
            </tbody>
          </table>
          <table class="modal-table">
            <thead>
              <tr>
                <td style={{ paddingLeft: width470 ? "0px" : "20px" }}>
                  Species
                </td>
                <td style={{ width: width470 ? "50px" : "150px" }}></td>
                <td style={{ paddingLeft: width470 ? "5px" : "20px" }}>
                  Origin
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ paddingLeft: width470 ? "0px" : "20px" }}>
                  {person.species.charAt(0).toUpperCase() +
                    person.species.slice(1)}
                </td>
                <td style={{ width: width470 ? "50px" : "150px" }}></td>
                <td style={{ paddingLeft: width470 ? "5px" : "20px" }}>
                  {person.origin.name.charAt(0).toUpperCase() +
                    person.origin.name.slice(1)}
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUp;
