import React from "react";

const Loader = () => <div style={{
  display: 'grid',
  placeContent: 'center',
  minHeight: '40vmin',
}}>
  <div className="lds-ripple">
    <div></div>
    <div></div>
  </div>
</div>;

export default Loader;
