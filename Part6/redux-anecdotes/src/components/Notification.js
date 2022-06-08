import { connect } from "react-redux"

const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 10,
  }

  if (notification) {
    return (
      <div style={style}>
        <p>{notification}</p>
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification