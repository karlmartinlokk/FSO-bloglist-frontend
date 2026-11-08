const Notification = ({ message }) => {
    if (!message) {
        return null
    }

    return (
        <div className='notification'>
            <h3>{message}</h3>
        </div>
        
    )
}

export default Notification