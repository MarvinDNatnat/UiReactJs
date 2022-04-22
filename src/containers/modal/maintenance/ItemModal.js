import React, { useState, useEffect } from 'react';
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

let test = [];
let testOld = [];

let serumEnzyme = [
    { value: "SGPT", label: "SGPT" },
    { value: "SGOT", label: "SGOT" },
    { value: "AMYLASE", label: "AMYLASE" },
    { value: "LIPASE", label: "LIPASE" },
    { value: "Gamma-Glutamyl Transferase", label: "Gamma-Glutamyl Transferase" },
    { value: "Lactate Dehydrogenase", label: "Lactate Dehydrogenase" },
    { value: "Alkaline Phosphatase", label: "Alkaline Phosphatase" },
    { value: "Creatine Phosphokinase", label: "Creatine Phosphokinase" },
];
let serumElectrolytes = [
    { value: "Sodium", label: "Sodium" },
    { value: "Potassium", label: "Potassium" },
    { value: "Chloride", label: "Chloride" },
    { value: "Magnesium", label: "Magnesium" },
    { value: "Total Calcium", label: "Total Calcium" },
    { value: "Ionized Calcium", label: "Ionized Calcium" },
    { value: "Inorganic Phosphorous", label: "Inorganic Phosphorous" },
    { value: "Total Iron", label: "Total Iron" }
];

let lipidProfile = [
    { value: "Cholesterol", label: "Cholesterol" },
    { value: "Triglycerides", label: "Triglycerides" },
    { value: "HDL", label: "HDL" },
];

let serology = [
    { value: "HBSAG", label: "HBSAG" },
    { value: "VDRLRPR", label: "VDRL/RPR" },
    { value: "HBEAG", label: "HBEAG" },
    { value: "ANTIHBC", label: "ANTI HBC" },
    { value: "ANTIHCV", label: "ANTI HCV" },
    { value: "ANTIHAV", label: "ANTI HAV" },
    { value: "ANTIHBS", label: "ANTI HBS" },
    { value: "ANTIHBE", label: "ANTI HBE" },
    { value: "PSA", label: "PSA" },
]
let thyroid = [
    { value: "TSH", label: "TSH" },
    { value: "FT3", label: "FT3" },
    { value: "T3", label: "T3" },
    { value: "FT4", label: "FT4" },
    { value: "T4", label: "T4" }
]


const ItemModal = (props) => {
    const classes = useStyles();
    const [services, setServices] = useState([]);
    // const [selectedValue, setSelectedValue] = useState([]);
    let isSpecific = props.itemData.isSpecific;

    useEffect(() => {
        if (props.itemData !== null) {
            if (props.itemData.itemLaboratoryProcedure !== null) {
                const serviceKey = props.itemData.itemLaboratoryProcedure.value;
                if (props.serviceList[serviceKey] !== undefined && props.serviceList[serviceKey] !== null && props.serviceList[serviceKey].length > 0) {
                    setServices(props.serviceList[serviceKey]);
                } else {
                    setServices([]);
                }
            } else {
                setServices([]);
            }
        }
    }, [props.itemData, props.serviceList]);

    const handleChange = (prop) => (event) => {
        
        const updateItemData = updateObject(props.itemData, {
            [prop]: event.target.value,
        });
        props.setItemData(updateItemData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        const updateItemData = updateObject(props.itemData, {
            [prop]: event.target.checked,
        });
        props.setItemData(updateItemData);
    };

    const handleSelectChange = (prop) => (event) => {
        const updateItemData = updateObject(props.itemData, {
            [prop]: event,
        });

        if (prop === 'itemCategory') {
            let isLaboratory = props.itemData.isLaboratory;
            let itemLaboratoryProcedure = props.itemData.itemLaboratoryProcedure;


            if (event !== null && event.value === 'LAB') {
                isLaboratory = true;
            } else {
                if (itemLaboratoryProcedure !== null) {
                    itemLaboratoryProcedure = null;
                }
                isLaboratory = false;
            }
            updateItemData.isLaboratory = isLaboratory;
            updateItemData.itemLaboratoryProcedure = itemLaboratoryProcedure;
        } else if (prop === 'itemLaboratoryProcedure') {
            let isService = props.itemData.isService;
            let itemLaboratoryServices = props.itemData.itemLaboratoryServices;
            if (event !== null) {
                const serviceKey = event.value;
                if (props.serviceList[serviceKey] !== undefined && props.serviceList[serviceKey] !== null && props.serviceList[serviceKey].length > 0) {
                    isService = true;
                    setServices(props.serviceList[serviceKey]);
                } else {
                    isService = false;
                    setServices([]);
                }

                if (props.itemData.itemLaboratoryProcedure === null || serviceKey !== props.itemData.itemLaboratoryProcedure.value) {
                    itemLaboratoryServices = [];
                }
            }
            else {
                isService = false;
                setServices([]);
                itemLaboratoryServices = [];
            }

            updateItemData.isService = isService;
            updateItemData.itemLaboratoryServices = itemLaboratoryServices;
        } else if (prop === 'itemLaboratoryServices') {

            if (test.length > 0) {
                isSpecific = false
            } else {
                isSpecific = true
            }

            updateItemData.isSpecific = isSpecific;
            if (event != null) {
                event.map(testr => {
                    switch (testr.value) {
                        case 'ENZY':
                            test = test.filter((i) => (test.indexOf(i) === -1))
                            test.push(...serumEnzyme);
                            break;
                        case 'ELEC':
                            test = test.filter((i) => (test.indexOf(i) === -1))
                            test.push(...serumElectrolytes);
                            break;
                        case 'LIPP':
                            test = test.filter((i) => (test.indexOf(i) === -1))
                            test.push(...lipidProfile);
                            break;
                        case 'SER':
                            test = test.filter((i) => (test.indexOf(i) === -1))
                            test.push(...serology);
                            break;
                        case 'THYR':
                            test = test.filter((i) => (test.indexOf(i) === -1))
                            test.push(...thyroid);
                            break;
                        default:
                            break;
                    }
                    return null
                })
            }
            test = test.filter((i) => (test.indexOf(i) === -1))
            if (event == null) {
                isSpecific = false;
                test = test.filter((i) => (test.indexOf(i) === -1))
            }
        } else if (prop === 'specificTest') {
            var specificTest = "";

            if (event != null) {
                event.map(test => {
                    specificTest = specificTest.concat(test.value + ":");
                    testOld = testOld.filter((i) => (event.indexOf(i) === -1))
                    return null
                });
            }

            props.itemData.specificTest = specificTest;
            updateItemData.specificTest = props.itemData.specificTest;
        }
        props.setItemData(updateItemData);
    }
    useEffect(() => {
        if (props.itemData.itemLaboratoryServices != null) {
            const updateItemData = updateObject(props.itemData, {
                isSpecific: true
            });
            props.setItemData(updateItemData);
        }
    }, [props.itemData.itemLaboratoryServices]);
    if (props.itemData.itemLaboratoryServices != null) {


        // isSpecific = true;
        props.itemData.itemLaboratoryServices.map(testr => {
            switch (testr.value) {
                case 'ENZY':
                    serumEnzyme.map(testr => {
                        if (!test.includes(testr)) {
                            test.push(...serumEnzyme);
                        }
                        return null
                    })
                    break;
                case 'ELEC':
                    serumElectrolytes.map(testr => {
                        if (!test.includes(testr)) {
                            test.push(...serumElectrolytes);
                        }
                        return null
                    })
                    break;
                case 'LIPP':
                    lipidProfile.map(testr => {
                        if (!test.includes(testr)) {
                            test.push(...lipidProfile);
                        }
                        return null
                    })
                    break;
                case 'SER':
                    serology.map(testr => {
                        if (!test.includes(testr)) {
                            test.push(...serology);
                        }
                        return null
                    })
                    break;
                case 'THYR':
                    thyroid.map(testr => {
                        if (!test.includes(testr)) {
                            test.push(...thyroid);
                        }
                        return null
                    })
                    break;
                default:
                    break;
            }
            return null
        })
    }

    if (props.itemData.specificTest != null) {
        let testold = props.itemData.specificTest.split(":")
        testold.forEach(element => {
            const item = test.filter(test => test.value === element);
            if (element.trim() !== "" && item.length > 0 && item !== null) {
                item.map(el => {
                    if (!testOld.includes(el)) {
                        testOld.push(...item);
                    }
                    return null
                })
            }
        });
    }


    const validateInputs = () => {
        let hasError = false;
        let errorItemName = false;
        let errorItemDesc = false;
        let errorItemPric = false;
        let errorItemCate = false;
        let errorItemLabo = false;
        let errorLabProc = false;
        let errorLabServ = false;
        let itemNameError = null;
        let itemDescError = null;
        let itemPricError = null;
        let itemCateError = null;
        let itemLaboError = null;
        let labProcError = null;
        let labServError = null;

        if (!checkValidity(props.itemData.itemName, { required: true })) {
            hasError = true;
            errorItemName = true;
            itemNameError = <FormHelperText id="helper-outlined-adornment-item-name">Item Name is required.</FormHelperText>;
        }

        if (!checkValidity(props.itemData.itemDescription, { required: true, maxLength: 250 })) {
            hasError = true;
            errorItemDesc = true;
            itemDescError = <FormHelperText id="helper-outlined-adornment-item-description">Item Description is required and must not exceed to 250 characters.</FormHelperText>;
        }

        if (!checkValidity(props.itemData.itemPrice, { required: true, isDecimal: true })) {
            hasError = true;
            errorItemPric = true;
            itemPricError = <FormHelperText id="helper-outlined-adornment-item-price">Item Price is required and numeric format.</FormHelperText>;
        }

        if (props.itemData.itemCategory === null) {
            hasError = true;
            errorItemCate = true;
            itemCateError = <FormHelperText id="helper-outlined-adornment-item-category">Item Category is required.</FormHelperText>;
        }

        if (props.itemData.itemLaboratory === null) {
            hasError = true;
            errorItemLabo = true;
            itemLaboError = <FormHelperText id="helper-outlined-adornment-item-laboratory">Item Laboratory is required.</FormHelperText>;
        }

        if (props.itemData.itemCategory !== null && props.itemData.itemCategory.value === "LAB") {
            if (props.itemData.itemLaboratory === null || props.itemData.itemLaboratory.value === 'NO') {
                hasError = true;
                errorItemLabo = true;
                itemLaboError = <FormHelperText id="helper-outlined-adornment-item-laboratory">Item Laboratory is required.</FormHelperText>;
            }

            if (props.itemData.itemLaboratoryProcedure === null) {
                hasError = true;
                errorLabProc = true;
                labProcError = <FormHelperText id="helper-outlined-adornment-laboratory-procedure">Laboratory Procedure is required.</FormHelperText>;
            }

            if (services.length > 0 && props.itemData.itemLaboratoryServices.length <= 0) {
                hasError = true;
                errorLabServ = true;
                labServError = <FormHelperText id="helper-outlined-adornment-laboratory-procedure">Laboratory Services is required.</FormHelperText>;
            }
        }
        const updateItemData = updateObject(props.itemData, {
            isErrorItemName: errorItemName,
            isErrorItemDesc: errorItemDesc,
            isErrorItemPrice: errorItemPric,
            isErrorItemCat: errorItemCate,
            isErrorItemLab: errorItemLabo,
            isErrorItemLabProc: errorLabProc,
            isErrorItemLabServ: errorLabServ,
            itemNameError: itemNameError,
            itemDescError: itemDescError,
            itemPriceError: itemPricError,
            itemCatError: itemCateError,
            itemLabError: itemLaboError,
            itemLabProcError: labProcError,
            itemLabServError: labServError,
        });
        props.setItemData(updateItemData);

        if (!hasError) {
            props.saveClick();
        }
    }


    let titleModal = "Add Item/Service";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    let activeOption = null;
    if (props.isUpdate !== null) {
        titleModal = "Update Item/Service";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.itemData.active}
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
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>{titleModal}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CContainer>
                    <CRow>
                        <CCol md="6" className="p-1">
                            <FormControl
                                error={props.itemData.isErrorItemName}
                                fullWidth
                                className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-item-name">Item Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-item-name"
                                    value={props.itemData.itemName}
                                    onChange={handleChange('itemName')}
                                    labelWidth={80}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.itemData.itemNameError}
                            </FormControl>
                        </CCol>
                        <CCol md="6" className="p-1">
                            <FormControl
                                error={props.itemData.isErrorItemDesc}
                                fullWidth
                                className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-item-description">Item Description</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-item-description"
                                    value={props.itemData.itemDescription}
                                    onChange={handleChange('itemDescription')}
                                    labelWidth={120}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.itemData.itemDescError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="3" className="p-0">
                            <FormControl
                                error={props.itemData.isErrorItemPrice}
                                fullWidth
                                className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-item-price">Item Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-item-price"
                                    type="number"
                                    value={props.itemData.itemPrice}
                                    onChange={handleChange('itemPrice')}
                                    labelWidth={75}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.itemData.itemPriceError}
                            </FormControl>
                        </CCol>
                        <CCol md="3" className="mt-3">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={props.itemData.onMenu}
                                        onChange={handleChangeSwitch('onMenu')}
                                        name="onMenu"
                                        color="primary"
                                    />
                                }
                                label="On Menu"
                            />
                        </CCol>
                        <CCol md="3" className="mt-3">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={props.itemData.taxable}
                                        onChange={handleChangeSwitch('taxable')}
                                        name="taxable"
                                        color="primary"
                                    />
                                }
                                label="Taxable"
                            />
                        </CCol>
                        <CCol md="3" className="mt-3">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={props.itemData.discountable}
                                        onChange={handleChangeSwitch('discountable')}
                                        name="discountable"
                                        color="primary"
                                    />
                                }
                                label="Discountable"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="6" className="p-1">
                            <FormControl
                                error={props.itemData.isErrorItemCat}
                                fullWidth
                                className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Category</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.itemData.itemCategory}
                                    onChange={handleSelectChange('itemCategory')}
                                    isClearable={true}
                                    isSearchable={true}
                                    isLoading={false}
                                    options={
                                        [].concat(props.categoryList)
                                            .sort((a, b) => a.value > b.value ? 1 : -1)
                                            .map((cat) => {
                                                return { value: cat.key, label: cat.value }
                                            })
                                    }
                                />
                                {props.itemData.itemCatError}
                            </FormControl>
                        </CCol>
                        <CCol md="6" className="p-1">
                            <FormControl
                                error={props.itemData.isErrorItemLab}
                                fullWidth
                                className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Laboratory Specimen / Procedure</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.itemData.itemLaboratory}
                                    onChange={handleSelectChange('itemLaboratory')}
                                    isClearable={true}
                                    isSearchable={true}
                                    isLoading={false}
                                    options={
                                        [].concat(props.laboratoryList)
                                            .sort((a, b) => a.value > b.value ? 1 : -1)
                                            .map((lab) => {
                                                return { value: lab.key, label: lab.value }
                                            })
                                    }
                                />
                                {props.itemData.itemLabError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="6" className="p-1">
                            <FormControl
                                error={props.itemData.isErrorItemLabProc}
                                fullWidth
                                className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Department</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.itemData.itemLaboratoryProcedure}
                                    onChange={handleSelectChange('itemLaboratoryProcedure')}
                                    isClearable={true}
                                    isSearchable={true}
                                    isLoading={false}
                                    isDisabled={!props.itemData.isLaboratory}
                                    options={
                                        [].concat(props.procedureList)
                                            .sort((a, b) => a.value > b.value ? 1 : -1)
                                            .map((proc) => {
                                                return { value: proc.key, label: proc.value }
                                            })
                                    }
                                />
                                {props.itemData.itemLabProcError}
                            </FormControl>
                        </CCol>
                        <CCol md="6" className="p-1">
                            <FormControl
                                error={props.itemData.isErrorItemLabServ}
                                fullWidth className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Service Request / Section / Test</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    isMulti={true}
                                    placeholder="--"
                                    value={props.itemData.itemLaboratoryServices}
                                    onChange={handleSelectChange('itemLaboratoryServices')}
                                    isClearable={true}
                                    isSearchable={true}
                                    isLoading={false}
                                    isDisabled={!props.itemData.isService}
                                    options={
                                        [].concat(services)
                                            .sort((a, b) => a.value > b.value ? 1 : -1)
                                            .map((srv) => {
                                                return { value: srv.key, label: srv.value }
                                            })
                                    }
                                />
                                {props.itemData.itemLabServError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="6" className="p-1">
                            <FormControl
                                fullWidth className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                {activeOption != null ? <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Status</CLabel> : null}
                                {activeOption}
                            </FormControl>
                        </CCol>
                        <CCol md="6" className="p-1">
                            <FormControl
                                error={props.itemData.isErrorItemLabServ}
                                fullWidth className={clsx(classes.margin)}
                                variant="outlined"
                            >
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Specific Test</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    isMulti={true}
                                    placeholder="--"
                                    onChange={handleSelectChange('specificTest')}
                                    isClearable={true}
                                    isSearchable={true}
                                    isLoading={false}
                                    isDisabled={!props.itemData.isSpecific}
                                    options={test.map(spc => { return { value: spc.value, label: spc.label } })}
                                />
                                {props.itemData.specificTest != null ?
                                props.itemData.specificTest : null}
                            </FormControl>
                        </CCol>
                    </CRow>
                </CContainer>
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
        categoryList: state.items.itemCategories,
        laboratoryList: state.items.itemLaboratories,
        procedureList: state.items.laboratoryProcedures,
        serviceList: state.items.laboratoryServices,
    }
};
export default connect(mapStateToProps)(ItemModal);
