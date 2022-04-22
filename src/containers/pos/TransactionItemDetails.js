import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { twoFixedAmt, updateObject } from 'src/store/utility';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    qty: {
        width: '40px',
    },
    dsc: {
        width: '40px',
    },
    itemTopColor: {
        backgroundColor: 'white',
        boxShadow: '5px 5px',
        border: 'double'
    },
}));

const TransactionItemDetails = (props) => {
    const classes = useStyles();
    const product = props.item;
    const prodItems = [];
    if (product.itemType === 'PCK') { // packages products
        const productInfo = props.item.info;
        productInfo.packageItems.forEach((itm, index) => {
            prodItems.push(itm.itemDescription);       
        });
    }
    const handleChange = (prop) => (event) => {
        const updateTxnItmData = updateObject(props.item, {
            [prop]: event.target.value,
        });
        props.updProd(updateTxnItmData, props.index);
    }

    let discountable = false;

    if (product.discountable) {
        if (props.item.discountType !== "SCD" && props.item.discountType !== "PWD") {
            discountable = true;
        }
    }

    return (
        <div className="col-md-12">
            <div className={clsx(classes.itemTopColor, "row mb-2")}>
            <div className="col-1 mt-1">
            <h5>{props.index+1}.</h5>
            </div>
                <div className="col-4 mt-1">
                    <span className="font-weight-bold">{product.itemDisplay}</span>
                    <ul>
                        {prodItems.map(list => (
                            <li key={list}>{list}</li>
                        ))}
                    </ul>
                </div>

                <div className="col-1 px-0 mt-1">
                    {
                        props.disAllBtns
                            ? props.item.quantity
                            : <input min={1}
                                className={classes.qty}
                                type="number"
                                value={props.item.quantity}
                                onChange={handleChange('quantity')}
                            />

                    }
                </div>
                <div className="col-2 text-right mt-1">
                    {twoFixedAmt(product.unitPrice)}
                </div>
                <div className="col-1 px-0 mt-1">
                    {
                        props.disAllBtns
                            ? props.item.discountRate
                            : <input
                                disabled={!discountable}
                                min={0}
                                max={25}
                                className={classes.dsc}
                                type="number"
                                value={props.item.discountRate}
                                onChange={handleChange('discountRate')}
                            />
                    }
                </div>
                <div className="col-2 text-right px-0 mt-1">
                    {twoFixedAmt(product.amountDue)}
                </div>
                <div className="col-1 mt-1">
                    {
                        props.disAllBtns
                            ? null
                            : <i className="fas fa-trash text-danger"
                                onClick={() => props.delProd(props.index)}
                                disabled={props.disAllBtns}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default TransactionItemDetails
