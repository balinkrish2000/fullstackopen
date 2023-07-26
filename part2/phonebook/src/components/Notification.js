const Notification = ({message, type}) => {

    if (message === '') return null

    let messageClass = 'notify'

    if (type === 'error') messageClass='error'

    return (
        <div className={messageClass}>
            {message}
        </div>
    )
}

export default Notification