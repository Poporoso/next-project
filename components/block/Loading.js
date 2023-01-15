import React from 'react'

const Loading = ({ status }) => {
    return (
        <div className={`loading ${status && 'active'}`}></div>
    )
}

export default Loading
