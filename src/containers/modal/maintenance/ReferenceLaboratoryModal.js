import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactSelect from 'react-select';

import {
    CButton,
    CCol,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,

} from '@coreui/react';

import {
    FormControl,
    InputLabel,
    OutlinedInput,
    Switch,
    FormControlLabel,
} from '@material-ui/core';

import { updateObject } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        // marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    }
}));

const ReferenceModal = (props) => {
    const classes = useStyles();

    const handleSelectItem = (prop) => (event) => {
        const updatePackageData = updateObject(props.state.referenceData, {
            [prop]: event,
        });
        props.setPackageData(updatePackageData);
    }

    const handleSelectPackage = (prop)  => (event) => {
        const updatePackageData = updateObject(props.state.referenceData, {
            [prop]: event,
        });
        props.setPackageData(updatePackageData);
    }

    const handleChangePrice = (test, prop, id) => (event) => {
        if (test == 'item') {
            let newdata = props.state.referenceData.referenceItems.find(item => item.value === id);
            newdata.molePrice = event.target.value;
    
            const updateItemData = updateObject(newdata, {
                [prop]: newdata,
            })
    
            const updateItemDataFinal = updateObject(props.state.referenceData, {
                [prop]: updateItemData,
            });
            props.updatePackageData(updateItemDataFinal);
        }
        if (test == 'package') {
            let newdata = props.state.referenceData.referencePackages.find(item => item.value === id);
            newdata.molePrice = event.target.value;
    
            const updateItemData = updateObject(newdata, {
                [prop]: newdata,
            })
    
            const updateItemDataFinal = updateObject(props.state.referenceData, {
                [prop]: updateItemData,
            });
            props.updatePackageData(updateItemDataFinal);
        }
    }
    


    const handleChange = (prop) => (event) => {
        const updatePackageData = updateObject(props.state.referenceData, {
            [prop]: event.target.value,
        });
        props.setPackageData(updatePackageData);
    };
    const validateInputs = () => {
        props.saveUpdateHandle()
    }
    let activeOption = ""
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    if (props.state.update) {
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        // checked={props.corporateData.active}
                        // onChange={handleChangeSwitch('active')}
                        name="active"
                        color="primary"
                    />
                }
                label="Active"
                className="mt-2"
            />
        );
    }
    return (
        <CModal
            show={props.state.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>{!props.state.update ? "Add" : "Update"} Reference Laboratory</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-company-name">Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-company-name"
                                value={props.state.referenceData.name}
                                onChange={handleChange('name')}
                                labelWidth={50}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-company-address">Adddress</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-company-address"
                                value={props.state.referenceData.address}
                                onChange={handleChange('address')}
                                labelWidth={75}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-contact-person">Contact Person</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-contact-person"
                                value={props.state.referenceData.contactPerson}
                                onChange={handleChange('contactPerson')}
                                labelWidth={115}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                        </FormControl>
                    </CCol>
                </CRow>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-contactNumber">Contact Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-contactNumber"
                                value={props.state.referenceData.contactNumber}
                                onChange={handleChange('contactNumber')}
                                labelWidth={115}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-email">SOP Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-email"
                                type="email"
                                value={props.state.referenceData.sopEmail}
                                onChange={handleChange('sopEmail')}
                                labelWidth={145}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-resultEmail">Results Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-resultEmail"
                                type="email"
                                value={props.state.referenceData.resultsEmail}
                                onChange={handleChange('resultsEmail')}
                                labelWidth={160}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                        </FormControl>
                    </CCol>
                </CRow>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Items</CLabel>
                            <ReactSelect
                                isMulti={true}
                                className="basic-single"
                                placeholder="Items/Services"
                                value={props.state.referenceData.referenceItems}
                                onChange={handleSelectItem('referenceItems')}
                                isClearable={true}
                                isSearchable={true}

                                options={
                                    [].concat(props.itemList)
                                        .filter(i => i.active === true)
                                        .sort((a, b) => a.itemName > b.itemName ? 1 : -1)
                                        .map((itm) => {
                                            return {
                                                value: itm.itemid,
                                                label: itm.itemName + " [" + itm.itemDescription + "] (" + itm.itemPrice.toFixed(2) + ")",
                                                info: itm,
                                                itemId: itm.itemid,
                                                originalPrice: itm.itemPrice,
                                                molePrice: 0,
                                                itemName: itm.itemName,
                                            }
                                        })
                                }
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Items</CLabel>
                            <ReactSelect
                                 isMulti={true}
                                 className="basic-single"
                                 placeholder="Package/s"
                                 value={props.state.referenceData.referencePackages}
                                 onChange={handleSelectPackage('referencePackages')}
                                 isClearable={true}
                                 isSearchable={true}
                                options={
                                    [].concat(props.packageList)
                                        .filter(p => p.active === true)
                                        .sort((a, b) => a.packageName > b.packageName ? 1 : -1)
                                        .map((pck) => {
                                            return {
                                                value: pck.packageid,
                                                label: pck.packageName + " (" + pck.packagePrice.toFixed(2) + ")",
                                                info: pck,
                                                packageId: pck.packageid,
                                                originalPrice: pck.packagePrice,
                                                molePrice: 0,
                                                packageName: pck.packageName,
                                            }
                                        })
                                }
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-soaCode">SOP Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-soaCode"
                                onChange={handleChange('sopCode')}
                                labelWidth={100}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-2">
                        {activeOption}

                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="4" className="col-12 m-0 p-2">
                        <b>Item Name</b>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-2">
                        <b>Quest Price</b>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-2">
                        <b>Reference Laboratory Price</b>
                    </CCol>
                </CRow>
                {props.state.referenceData.referenceItems != null && props.state.referenceData.referenceItems !== undefined ?
                    props.state.referenceData.referenceItems.map((item, index) => {
                        return <CRow key={index}>
                            <CCol md="4" className="col-12 m-0 p-2">
                                {item.itemName}
                            </CCol>
                            <CCol md="4" className="col-12 m-0 p-2">
                                {item.originalPrice}
                            </CCol>
                            <CCol md="4" className="col-12 p-0">
                                <FormControl className={clsx(classes.margin)} variant="outlined">
                                    <input
                                        type="number"
                                        min="1"
                                        id="outlined-adornment-corporate-resultEmail"
                                        value={item.molePrice}
                                        onChange={handleChangePrice('item', 'molePrice', item.value)}
                                        margin="dense"
                                    />
                                </FormControl>
                            </CCol>
                        </CRow>
                    }) :
                    null}
                    {props.state.referenceData.referencePackages != null && props.state.referenceData.referencePackages !== undefined ?
                    props.state.referenceData.referencePackages.map((item, index) => {
                        return <CRow key={index}>
                            <CCol md="4" className="col-12 m-0 p-2">
                                {item.packageName}
                            </CCol>
                            <CCol md="4" className="col-12 m-0 p-2">
                                {item.originalPrice}
                            </CCol>
                            <CCol md="4" className="col-12 p-0">
                                <FormControl className={clsx(classes.margin)} variant="outlined">
                                    <input
                                        type="number"
                                        min="1"
                                        id="outlined-adornment-corporate-resultEmail"
                                        value={item.molePrice}
                                        onChange={handleChangePrice('package','molePrice', item.value)}
                                        margin="dense"
                                    />
                                </FormControl>
                            </CCol>
                        </CRow>
                    }) :
                    null}
            </CModalBody>
            <CModalFooter>
                {saveButton}
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ReferenceModal
