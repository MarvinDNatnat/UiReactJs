import React, { Component } from 'react';
import POS from './POS';

export class ModifyTransaction extends Component {
    render() {
        return (
            <POS
                txnID={this.props.match.params.id}
                isUpdate={true}
            />
        )
    }
}

export default ModifyTransaction
