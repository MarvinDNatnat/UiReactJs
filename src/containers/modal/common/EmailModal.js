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

const EmailModal = (props) => {
    const classes = useStyles();
    const [emailRec, setEmailRec] = useState('');
    const [emailCc, setEmailCc] = useState('');
    const [emailSub, setEmailSub] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [emailAttach, setEmailAttach] = useState([])


    useEffect(() => {
        if (props.emailData !== null && props.emailData.emailContent !== undefined && props.emailData.emailContent !== null) {
            const emailContent = props.emailData.emailContent;

            if (emailContent.sendTo !== undefined && emailContent.sendTo !== null) {
                setEmailRec(emailContent.sendTo);
            }

            if (emailContent.sendCc !== undefined && emailContent.sendCc !== null) {
                setEmailCc(emailContent.sendCc);
            }

            if (emailContent.emailSubject !== undefined && emailContent.emailSubject !== null) {
                setEmailSub(emailContent.emailSubject);
            }

            if (emailContent.emailBody !== undefined && emailContent.emailBody !== null) {
                setEmailBody(emailContent.emailBody);
            }
            if (emailContent.emailAttach !== undefined && emailContent.emailAttach !== null) {
                setEmailAttach(emailContent.emailAttach);
            }
        }
    }, [props.emailData]);


    const validateInputs = () => {
        const dataReq = new FormData();
        dataReq.append("sendTo", emailRec);
        dataReq.append("emailBody", emailBody);
        dataReq.append("emailSubject", emailSub);
        for (let i = 0; i < emailAttach.length; i++) {
            dataReq.append("file", emailAttach[i])
        }

        dataReq.append("sendStatus", true);

        if (props.emailtype === "soa") {
            props.onSendEmailSoa(dataReq);
        } else if (props.emailtype === "sop") {
            props.onSendEmailSop(dataReq);
        }else if (props.emailType === "antigen") {
            props.onSendEmailSerology(dataReq, props.seroData.txnId, props.seroData.id)
        }else {
            props.onSendEmail(dataReq, props.propData.txnId);
        }
    }

    const handleChange = (prop) => (event) => {
        switch (prop) {
            case 'emailRec':
                setEmailRec(event.target.value);
                break;

            case 'emailCc':
                setEmailCc(event.target.value);
                break;

            case 'emailSub':
                setEmailSub(event.target.value);
                break;

            case 'emailBody':
                setEmailBody(event.target.value);
                break;

            case 'emailAttach':
                setEmailAttach(event.target.files);
                break;

            default:
                break;
        }
    };

    return (
        <CModal
            size={"lg"}
            show={props.emailModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle>Email Modal</CModalTitle>
            </CModalHeader>

            <CModalBody>
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                    <TextField
                        name="recipient"
                        label="Recipient"
                        variant="outlined"
                        value={emailRec}
                        onChange={handleChange('emailRec')}
                    />
                </FormControl >
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                    <TextField
                        name="Cc"
                        label="Cc"
                        value={emailCc}
                        variant="outlined"
                        onChange={handleChange('emailCc')}
                    />
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                    <TextField
                        name="subject"
                        label="Subject"
                        variant="outlined"
                        value={emailSub}
                        onChange={handleChange('emailSub')}
                    />
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                    <TextField
                        name="body"
                        label="Body"
                        variant="outlined"
                        multiline
                        rows={12}
                        value={emailBody}
                        onChange={handleChange('emailBody')}
                    />
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                    <input
                        type="file"
                        name="file"
                        multiple
                        variant="outlined"
                        onChange={handleChange('emailAttach')}
                    />
                </FormControl>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={validateInputs}
                >
                    Send
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

export default EmailModal
