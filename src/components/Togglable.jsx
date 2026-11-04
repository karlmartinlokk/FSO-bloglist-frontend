import { useState, useImperativeHandle } from 'react'

const Togglable = ({ openLabel, closeLabel, children, ref }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{openLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>{closeLabel}</button>
            </div>
        </div>
    )
}

export default Togglable