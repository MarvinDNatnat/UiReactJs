import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { updateObject } from 'src/store/utility';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CRow, CCol
} from '@coreui/react';

import {
    FormControl, Select
} from '@material-ui/core';

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

const ToxicologyEditInfo = (props) => {
    const classes = useStyles();

    const npOptions = [
        { value: true, label: 'POSITIVE' },
        { value: false, label: 'NEGATIVE' },
    ]

    const handleSelectChange = (opt, prop) => (event) => {
        const updateToxiData = updateObject(props.toxiData, {
            [opt]: updateObject(props.toxiData[opt], {
                [prop]: JSON.parse(event.target.value),
            })
        });

        props.setToxiData(updateToxiData);
    }

    return (
        <div>
            <CCard className="mb-1">
                <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                    <span className="font-weight-bold">Toxicology Results</span>
                </CCardHeader>

                <CCardBody>
                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="4">
                            <FormControl error={props.toxiData.toxicology.isMethamphethamineError} fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Methamphethamine</CLabel>
                                <Select
                                    native
                                    value={JSON.stringify(props.toxiData.toxicology.methamphethamine) || ''}
                                    onChange={handleSelectChange('toxicology', 'methamphethamine')}
                                >
                                    <option value={JSON.stringify('')}>--</option>
                                    {
                                        npOptions.map(options =>
                                            <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </CCol>

                        <CCol md="4">
                            <FormControl error={props.toxiData.toxicology.isTetrahydrocanabinolError} fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Tetrahydrocanabinol</CLabel>
                                <Select
                                    native
                                    value={JSON.stringify(props.toxiData.toxicology.tetrahydrocanabinol) || ''}
                                    onChange={handleSelectChange('toxicology', 'tetrahydrocanabinol')}
                                >
                                    <option value={JSON.stringify('')}>--</option>
                                    {
                                        npOptions.map(options =>
                                            <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </CCol>
                    </CRow>

                </CCardBody>
            </CCard>
        </div>
    )
}

export default ToxicologyEditInfo;