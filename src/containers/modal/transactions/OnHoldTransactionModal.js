import React, { Component } from 'react'

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';

import OnHoldTransactionsTable from 'src/containers/tables/transactions/OnHoldTransactionsTable';

export class OnHoldTransactionModal extends Component {
    render() {
        return (
            <CModal
                show={this.props.showModal}
                onClose={() => this.props.closeClick(null)}
                closeOnBackdrop={false}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>On Hold Transactions</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="table-responsive">
                        <OnHoldTransactionsTable onRef={ref => (this.onHoldTxnTableRef = ref)} loadTransaction={this.props.loadTxn} />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        className="border border-dark"
                        color="danger"
                        onClick={() => this.props.closeClick(null)}
                    >
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        )
    }
}

export default OnHoldTransactionModal
