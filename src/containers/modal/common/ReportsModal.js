import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import {
  CButton,
  CCol,
  CModal,
  CLabel,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CInput,
  CCardBody,
  CCardHeader,
  CCard
} from "@coreui/react";
import { updateObject } from 'src/store/utility';

import { FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  margin: {
    margin: theme.spacing(0),
  },
  outlinedInput: {
    marginTop: theme.spacing(1),
  },
  labelText: {
    fontSize: "0.8rem",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
  },
  rightAlign: {
    textAlign: "right",
  },
  cardBlueWhite: {
    backgroundColor: "#4267B2",
    color: "white",
  },
}));

const ReportsModal = (props) => {
  const thousandsAmt = props.denomination.thousands * 1000;
  const fiveHundredsAmt = props.denomination.fiveHundreds * 500;
  const twoHundredsAmt = props.denomination.twoHundreds * 200;
  const oneHundredsAmt = props.denomination.oneHundreds * 100;
  const fiftiesAmt = props.denomination.fifties * 50;
  const twentiesAmt = props.denomination.twenties * 20;
  const tensAmt = props.denomination.tens * 10;
  const fiveAmt = props.denomination.five * 5;
  const oneAmt = props.denomination.one * 1;
  const centsAmt = props.denomination.cents * .25;
  const totalSum = thousandsAmt + fiveHundredsAmt + twoHundredsAmt + oneHundredsAmt + fiftiesAmt + twentiesAmt + tensAmt + fiveAmt + oneAmt + centsAmt

  const handleChange = (prop) => (event) => {

    const updateDenominationData = updateObject(props.denomination, {
      [prop]: event.target.value
    });

    props.updateState(updateDenominationData);
  };

  const classes = useStyles();

  const save = () => {
    props.save();
  }

  const verify = () => {
    props.verifyReport();
  }
  const note = () => {
    props.noteReport();
  }
  return (
    <CModal
      show={props.showModal}
      onClose={() => props.closeClick(null)}
      closeOnBackdrop={false}
    >
      <CModalHeader className={classes.cardBlueWhite} closeButton>
        <CModalTitle>{props.editFlag ? "Update" : "Create"} Report</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CCardBody>
          Report Name
          <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
            <h6 className="m-1">{props.reportName}</h6>
          </CCardHeader>
          <CCard className="mb-1">
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl
                  fullWidth
                  className={clsx(classes.margin, "m-0 p-0")}
                  variant="outlined"
                >
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    Denomination
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>
                    No. of Pieces
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    Amount
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    1000
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6> {props.denomination.thousands} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.thousands}
                        onChange={handleChange('thousands')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {thousandsAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    500
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.fiveHundreds} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.fiveHundreds}
                        onChange={handleChange('fiveHundreds')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {fiveHundredsAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    200
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.twoHundreds} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.twoHundreds}
                        onChange={handleChange('twoHundreds')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {twoHundredsAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    100
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.oneHundreds} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.oneHundreds}
                        onChange={handleChange('oneHundreds')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {oneHundredsAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    50
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.fifties} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.fifties}
                        onChange={handleChange('fifties')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {fiftiesAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    20
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.twenties} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.twenties}
                        onChange={handleChange('twenties')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {twentiesAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    10
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.tens} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.tens}
                        onChange={handleChange('tens')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {tensAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    5
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.five} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.five}
                        onChange={handleChange('five')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {fiveAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    1
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.one} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.one}
                        onChange={handleChange('one')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {oneAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    25cents
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol style={{ textAlign: "center" }}>
                <FormControl>
                  {
                    props.viewMode !== "Cashier" ? <h6 style={{ textAlign: "left" }}> {props.denomination.cents} </h6> :
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> <CInput
                        style={{ width: "60px" }}
                        value={props.denomination.cents}
                        onChange={handleChange('cents')} />
                      </CLabel>
                  }
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {centsAmt}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>

            <CRow>
              <CCol md="4" className="p-2">
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>
                    Total
                  </CLabel>
                </FormControl>
              </CCol>
              <CCol>
                <FormControl>
                  <CLabel className={clsx(classes.labelText, "mb-0 ml-4")}>
                    ₱ {totalSum}
                  </CLabel>
                </FormControl>
              </CCol>
            </CRow>
          </CCard>
          {
            props.viewMode !== "Cashier" ?
              <>
                <CRow>
                  <CCol md="3" className="">
                    <b>Reported By:</b>
                  </CCol>
                  <CCol md="9" className="">
                    {props.createdBy}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="3" className="">
                    <b>Verified By:</b>
                  </CCol>
                  <CCol md="9" className="">
                    {props.verifiedBy}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="3" className="">
                    <b>Noted By:</b>
                  </CCol>
                  <CCol md="9" className="">
                    {props.notedBy}
                  </CCol>
                </CRow>
              </> : null
          }

        </CCardBody>
      </CModalBody>

      <CModalFooter>
        {
          props.viewMode === "Treasurer" ? <CButton
            className="border border-dark"
            color="primary"
            onClick={verify}
          >
            Verify
          </CButton> : null
        }
        {
          props.viewMode === "Auditor" && props.verifiedBy !== "" ? <CButton
            className="border border-dark"
            color="primary"
            onClick={note}
          >
            Noted
          </CButton> : null
        }
        {
          props.viewMode === "Cashier" ? <CButton
            className="border border-dark"
            color="primary"
            onClick={save}
          >
            Save
          </CButton> : null
        }

        <CButton
          className="border border-dark"
          color="danger"
          onClick={() => props.closeClick(null)}
        >
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ReportsModal;
