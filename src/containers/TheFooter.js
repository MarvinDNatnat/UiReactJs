import React from 'react';
import { CFooter } from '@coreui/react'

const TheFooter = () => {
    return (
        <CFooter fixed={false}>
            <div>
                <a href={process.env.REACT_APP_URL} target="_blank" rel="noopener noreferrer">
                    {process.env.REACT_APP_NAME}
                </a>
                <span className="ml-1">{process.env.REACT_APP_ADDRESS}</span>
            </div>
            <div className="mfs-auto">
                {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a>
                <span className="ml-1">&copy; 2020 creativeLabs.</span> */}
                <span className="mr-1">Powered by</span>
                <a href={process.env.REACT_APP_URL} target="_blank" rel="noopener noreferrer">Quest Info System</a>
            </div>
        </CFooter>
    )
}

export default React.memo(TheFooter)
