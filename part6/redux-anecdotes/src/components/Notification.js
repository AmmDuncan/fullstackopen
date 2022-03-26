import { connect } from "react-redux";

const Notification = ({ message }) => {
  if (!message) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{message}</div>;
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps)(Notification);
