import React from 'react'
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactSelect from 'react-select';

import {
    CButton,
    CContainer,
    CRow,
    CCol,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Switch,
} from '@material-ui/core';

import { updateObject, checkValidity } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    }
}));

const PackageModal = (props) => {
    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        const updatePackageData = updateObject(props.packageData, {
            [prop]: event.target.value,
        });
        props.setPackageData(updatePackageData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        const updatePackageData = updateObject(props.packageData, {
            [prop]: event.target.checked,
        });
        props.setPackageData(updatePackageData);
    };

    const handleSelectChange = (prop) => (event) => {
        const updatePackageData = updateObject(props.packageData, {
            [prop]: event,
        });
        props.setPackageData(updatePackageData);
    };

    const mapPackageType = [
        {value: 'IndustrialPackage' ,label : 'Industrial Package'},
        {value: 'TestPackage' ,label : 'Test Package'},
    ]

    const validateInputs = () => {
        let hasError = false;
        let errorPckName = false;
        let errorPckDesc = false;
        let errorPckPric = false;
        let errorPckType = false;
        let errorPckItms = false;
        let pckNameError = null;
        let pckDescError = null;
        let pckPricError = null;
        let pckTypeError = null;
        let pckItmsError = null;

        if (!checkValidity(props.packageData.packageName, { required: true })) {
            hasError = true;
            errorPckName = true;
            pckNameError = <FormHelperText id="helper-outlined-adornment-package-name">Package Name is required.</FormHelperText>;
        }

        if (!checkValidity(props.packageData.packageDescription, { required: true, maxLength: 250 })) {
            hasError = true;
            errorPckDesc = true;
            pckDescError = <FormHelperText id="helper-outlined-adornment-package-description">Package Description is required and must not exceed to 250 characters.</FormHelperText>;
        }

        if (!checkValidity(props.packageData.packagePrice, { required: true, isDecimal: true })) {
            hasError = true;
            errorPckPric = true;
            pckPricError = <FormHelperText id="helper-outlined-adornment-package-price">Package Price is required and numeric format.</FormHelperText>;
        }

        if (props.packageData.packageType === null) {
            hasError = true;
            errorPckType = true;
            pckTypeError = <FormHelperText id="helper-outlined-adornment-package-type">Package Type is required.</FormHelperText>;
        }

        if (props.packageData.packageItems.length <= 0) {
            hasError = true;
            errorPckItms = true;
            pckItmsError = <FormHelperText id="helper-outlined-adornment-items">Package Items are required.</FormHelperText>;
        }

        const updatePackageData = updateObject(props.packageData, {
            isErrorPckName: errorPckName,
            isErrorPckDesc: errorPckDesc,
            isErrorPckPrice: errorPckPric,
            isErrorPckTyp: errorPckType,
            isErrorPckItm: errorPckItms,
            pckNameError: pckNameError,
            pckDescError: pckDescError,
            pckPriceError: pckPricError,
            pckTypeError: pckTypeError,
            pckItmsError: pckItmsError,
        });
        props.setPackageData(updatePackageData);

        if (!hasError) {
            props.saveClick();
        }
    }

    let titleModal = "Add Package";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    let activeOption = null;
    if (props.isUpdate !== null) {
        titleModal = "Update Package";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.packageData.active}
                        onChange={handleChangeSwitch('active')}
                        name="active"
                        color="primary"
                    />
                }
                label="Active"
            />
        );
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{titleModal}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <FormControl error={props.packageData.isErrorPckName} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-package-name">Package Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-package-name"
                        value={props.packageData.packageName}
                        onChange={handleChange('packageName')}
                        labelWidth={110}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.packageData.pckNameError}
                </FormControl>
                <FormControl error={props.packageData.isErrorPckDesc} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-package-description">Package Description</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-package-description"
                        value={props.packageData.packageDescription}
                        onChange={handleChange('packageDescription')}
                        labelWidth={150}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.packageData.pckDescError}
                </FormControl>
                <CContainer>
                    <CRow>
                        <CCol md="4" className="p-0">
                            <FormControl error={props.packageData.isErrorPckPrice} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-package-price">Package Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-package-price"
                                    type="number"
                                    value={props.packageData.packagePrice}
                                    onChange={handleChange('packagePrice')}
                                    labelWidth={110}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.packageData.pckPriceError}
                            </FormControl>
                        </CCol>
                        <CCol md="5" className="mt-3">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={props.packageData.onMenu}
                                        onChange={handleChangeSwitch('onMenu')}
                                        name="onMenu"
                                        color="primary"
                                    />
                                }
                                label="On Menu"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="4" className="mt-1">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={props.packageData.taxable}
                                        onChange={handleChangeSwitch('taxable')}
                                        name="taxable"
                                        color="primary"
                                    />
                                }
                                label="Taxable"
                            />
                        </CCol>
                        <CCol md="4" className="mt-1">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={props.packageData.discountable}
                                        onChange={handleChangeSwitch('discountable')}
                                        name="discountable"
                                        color="primary"
                                    />
                                }
                                label="Discountable"
                            />
                        </CCol>
                    </CRow>
                </CContainer>
                <FormControl error={props.packageData.isErrorPckTyp} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Package Type</CLabel>
                    <ReactSelect
                        className="basic-single"
                        placeholder="--"
                        value={props.packageData.packageType}
                        onChange={handleSelectChange('packageType')}
                        isClearable={true}
                        isSearchable={true}
                        isLoading={false}
                        options={
                            [].concat(props.packageTypes)
                                .sort((a, b) => a.value > b.value ? 1 : -1)
                                .map((pTyp) => {
                                    return { value: pTyp.key, label: pTyp.value }
                                })
                        }
                    />
                    {props.packageData.pckTypeError}
                </FormControl>
                <FormControl error={props.packageData.isErrorPckItm} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Package Item(s)</CLabel>
                    <ReactSelect
                        className="basic-single"
                        isMulti={true}
                        placeholder="--"
                        value={props.packageData.packageItems}
                        onChange={handleSelectChange('packageItems')}
                        isClearable={true}
                        isSearchable={true}
                        isLoading={false}
                        options={
                            [].concat(props.itemList)
                                .sort((a, b) => a.itemName.toUpperCase() > b.itemName.toUpperCase() ? 1 : -1)
                                .map((item) => {
                                    return { value: item.itemid, label: item.itemName + '[' + item.itemDescription + '](' + item.itemPrice.toFixed(2) + ')' }
                                })
                        }
                    />
                    {props.packageData.pckItmsError}
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Type Test</CLabel>
                    <ReactSelect
                        className="basic-single"
                        placeholder="--"
                        value={props.packageData.typeTestPackage}
                        onChange={handleSelectChange('typeTestPackage')}
                        isClearable={true}
                        isSearchable={true}
                        isLoading={false}
                        options={mapPackageType}
                    />
                </FormControl>
                {activeOption}
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

const mapStateToProps = (state) => {
    return {
        itemList: state.items.itemList,
        packageTypes: state.packs.packageTypes,
    }
};
export default connect(mapStateToProps)(PackageModal)
