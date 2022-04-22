import React from 'react';
import { twoFixedAmt } from 'src/store/utility';

import {
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import {
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

import { updateObject } from 'src/store/utility';

const TransactionItemRefunds = (props) => {
    const product = props.item;
    const prodItems = [];
    if (product.itemType === 'PCK') { // packages products
        const productInfo = props.item.info;
        productInfo.packageItems.forEach(itm => {
            prodItems.push(itm.itemDescription);
        });
    }

    const handleCheckBox = (prop) => (event) => {
        const updateTxnItmData = updateObject(props.item, {
            [prop]: event.target.checked,
        });
        props.slcProdItm(updateTxnItmData, props.index);
    }

    let selectOption = "** " + product.itemDisplay;
    if (props.item.status === 1) {
        selectOption = (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.isSelected}
                        onChange={handleCheckBox('isSelected')}
                        name="checkedB"
                        color="primary"
                        className="p-0"
                    />
                }
                label={product.itemDisplay}
                className="m-0"
            />
        );
    }

    return (
        <CContainer>
            <CRow>
                <CCol md="5">
                    {selectOption}
                    <ul>
                        {prodItems.map(list => (
                            <li key={list}>{list}</li>
                        ))}
                    </ul>
                </CCol>
                <CCol md="3" className="text-right">
                    {twoFixedAmt(product.unitPrice)}
                </CCol>
                <CCol md="1" className="px-0 text-center">
                    {props.item.quantity}
                </CCol>
                <CCol md="1" className="px-0 text-center">
                    {props.item.discountRate}
                </CCol>
                <CCol md="2" className="text-right px-0">
                    {twoFixedAmt(product.amountDue)}
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default TransactionItemRefunds
