import * as React from "react";

const Load = () => {
    return <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <div style={{
            fontSize: '24px',
            color: '#abcdef',
            fontWeight: 'bold'
        }}>loading ...</div>
    </div>
}

export default Load
