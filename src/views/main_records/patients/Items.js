import React from 'react'

const Items = (props) => {

    return(
            <table>
                <thead>
                    <tr>
                        <th className="col-md-2 bg-info text-white">Name</th>
                        <th className="col-md-2 bg-info text-white">Price</th>
                        <th className="col-md-2 bg-info text-white">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.items.map(item => (
                        <tr key={item.id}>
                            <td className="col-md-2 bgwhite font-weight-bold">{item.name}</td>
                            <td className="col-md-2 bgwhite font-weight-bold">{item.price}</td>
                            <td className="col-md-2 bgwhite"><button onClick={() => props.delHandler(item.id)} className="btn-custom"><i className="fas fa-trash text-danger"></i></button></td>
                        </tr>
                    ))}
                    <tr>
                        <th className="col-md-2 text-right font-weight-bold">Total:</th>
                        <th className="col-md-2 font-weight-bold">{props.totalAmt}</th>
                        <td className="col-md-2"></td>
                    </tr>
                </tbody>
            </table> 
        )
    }
export default Items