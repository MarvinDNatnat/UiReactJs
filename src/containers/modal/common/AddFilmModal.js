import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CLabel,
  CInput,
  CRow,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import { FormControl} from "@material-ui/core";

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

const AddFilmModal = (props) => {
  const classes = useStyles();
  
  return (
    <CModal
      show={props.showModal}
      onClose={() => props.closeClick(null)}
      closeOnBackdrop={false}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle>Film Inventory</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="m-0 p-0">
          <CCol className="m-0 p-0">
            <CCard className="mb-1">
              <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                <span className="font-weight-bold">Add Film</span>
              </CCardHeader>

              <CCardBody>
                <CRow>
                  <CCol md="4" className="p-1">
                    <FormControl
                      fullWidth
                      className={clsx(classes.margin, "m-0 p-0")}
                      variant="outlined"
                    >
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>
                        11x14
                      </CLabel>
                      <CInput
                        value={props.filmData.film11x14}
                        onChange={
                          props.index !== undefined && props.index !== null
                            ? props.handleChange("filmConf", "film11x14", props.index)
                            : props.handleChange("filmConf", "film11x14")
                        }
                      />
                    </FormControl>
                  </CCol>
                  <CCol md="4" className="p-1">
                    <FormControl
                      fullWidth
                      className={clsx(classes.margin, "m-0 p-0")}
                      variant="outlined"
                    >
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>
                        10x12
                      </CLabel>
                      <CInput
                        value={props.filmData.film10x12}
                        onChange={
                          props.index !== undefined && props.index !== null
                            ? props.handleChange("filmConf", "film10x12", props.index)
                            : props.handleChange("filmConf", "film10x12")
                        }
                      />
                    </FormControl>
                  </CCol>
                  <CCol md="4" className="p-1">
                    <FormControl
                      fullWidth
                      className={clsx(classes.margin, "m-0 p-0")}
                      variant="outlined"
                    >
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>
                        14x17
                      </CLabel>
                      <CInput
                        value={props.filmData.film14x17}
                        onChange={
                          props.index !== undefined && props.index !== null
                            ? props.handleChange("filmConf", "film14x17", props.index)
                            : props.handleChange("filmConf", "film14x17")
                        }
                      />
                    </FormControl>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="4" className="p-1">
                    <FormControl
                      fullWidth
                      className={clsx(classes.margin, "m-0 p-0")}
                      variant="outlined"
                    >
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>
                        8x10
                      </CLabel>
                      <CInput
                        value={props.filmData.film8x10}
                        onChange={
                          props.index !== undefined && props.index !== null
                            ? props.handleChange("filmConf", "film8x10", props.index)
                            : props.handleChange("filmConf", "film8x10")
                        }
                      />
                    </FormControl>
                  </CCol>
                  <CCol md="4" className="p-1">
                    <FormControl
                      fullWidth
                      className={clsx(classes.margin, "m-0 p-0")}
                      variant="outlined"
                    >
                      <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>
                        14x14
                      </CLabel>
                      <CInput
                        value={props.filmData.film14x14}
                        onChange={
                          props.index !== undefined && props.index !== null
                            ? props.handleChange("filmConf", "film14x14", props.index)
                            : props.handleChange("filmConf", "film14x14")
                        }
                      />
                    </FormControl>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CModalBody>

      <CModalFooter>
      <CButton
          className="border border-dark"
          color="primary"
          onClick={() => props.saveFilm()}
        >
          Save
        </CButton>
        <CButton
          className="border border-dark"
          color="danger"
          onClick={() => props.closeClick(null)}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddFilmModal;
