const Notification = ({message}) => {
    if (message === '') {
      return <div className="empty"></div>
    }
    if (message.includes('error')) {
      return <div className="error" >{message}</div>
    }
    return (
      <div className="notif">
        {message}
      </div>
    )
}

export default Notification