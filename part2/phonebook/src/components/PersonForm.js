import React from "react";

const PersonForm = ({
  handler,
  newName,
  setNewName,
  newPhone,
  setNewPhone,
}) => (
  <form onSubmit={handler}>
    <div>
      name:{" "}
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      phone:{" "}
      <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
