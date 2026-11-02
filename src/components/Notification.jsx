const Notification = ({ message }) => {
    if (!message) {
        return null
    }

    return (
        <h3>{message}</h3>
    )
}

export default Notification