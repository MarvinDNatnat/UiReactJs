import React, { Component } from 'react'
import POS from './POS';

export class NewTransaction extends Component {
    render() {
        return (
            <POS
                txnID={null}
                isUpdate={false}
            />
        )
    }
}

export default NewTransaction
