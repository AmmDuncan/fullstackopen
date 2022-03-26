import { connect } from "react-redux";
import { actions as filterActions } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

const mapDispatchToProps = {
  ...filterActions,
};

export default connect(null, mapDispatchToProps)(Filter);
