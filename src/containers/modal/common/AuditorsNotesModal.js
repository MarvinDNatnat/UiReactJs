import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

} from '@coreui/react';

import {
    FormControl,
    TextField
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(0)
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    rightAlign: {
        textAlign: 'right',
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const AuditorsNotesModal = (props) => {
    const classes = useStyles();
    const [notes, setNotes] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');



    useEffect(() => {
        if (props.eodData !== null && props.eodData.eodContent !== undefined && props.eodData.eodContent !== null) {
            const eodContent = props.eodData.eodContent;

            if (eodContent.notes !== undefined && eodContent.notes !== null) {
                setNotes(eodContent.notes);
            }

            if (eodContent.referenceNumber !== undefined && eodContent.referenceNumber !== null) {
               setReferenceNumber(eodContent.referenceNumber);
            }
        }
       
    }, [props.eodData]);


    const validateInputs = () => {
        const dataReq = new FormData();
        dataReq.append("notes", notes);
        dataReq.append("referenceNumber", referenceNumber);

        props.onSaveNotesReferenceNumber(dataReq);
    }

    const handleChange = (prop) => (event) => {
        switch (prop) {
            case 'referenceNumber':
                setReferenceNumber(event.target.value);
                break;
            case 'notes':
                setNotes(event.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <CModal
            size={"lg"}
            show={props.auditModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle>Auditors Notes</CModalTitle>
            </CModalHeader>

            <CModalBody>
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                    <TextField
                        name="external reference number"
                        label="External Reference Number"
                        variant="outlined"
                        value={referenceNumber}
                        onChange={handleChange('referenceNumber')}
                    />
                </FormControl >


                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                    <TextField
                        name="notes"
                        label="Notes"
                        variant="outlined"
                        value={notes}
                        onChange={handleChange('notes')}
                    />
                </FormControl >
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={validateInputs}
                >
                    Submit
                        </CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default AuditorsNotesModal
