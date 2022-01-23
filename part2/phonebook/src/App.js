import React, { useEffect, useState } from "react";
import notes from "./services";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const notify = (n) => {
    setNotification(n);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const resetInputs = () => {
    setNewName("");
    setNewPhone("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const person = persons.find((p) => p.name === newName);
    console.log(person);

    if (person) {
      // alert(`${newName} is already added to phonebook`);
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const newPerson = { ...person, number: newPhone };
        notes
          .update(newPerson)
          .then(() =>
            setPersons(
              persons.map((p) => (p.id !== newPerson.id ? p : newPerson))
            )
          );
        notify({ message: `Updated ${newName}`, type: "success" });
        resetInputs();
      }
    } else {
      const person = { name: newName, number: newPhone };
      notes.create(person).then((res) => {
        setPersons(persons.concat(res));
      });
      notify({ message: `Added ${newName}`, type: "success" });
      resetInputs();
    }
  };

  const deleteHandler = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    const name = persons.find((p) => p.id === id).name;
    if (confirm)
      notes
        .remove(id)
        .then(() => {
          setPersons(persons.filter((n) => n.id !== id));
          notify({ message: `Deleted ${name}`, type: "" });
        })
        .catch((err) => {
          notify({
            message: `${name} has already been removed from server`,
            type: "error",
          });
        });
  };

  const peopleThatMatch = (p) =>
    p.name.toLowerCase().includes(filter.toLowerCase());
  let contactsToShow = filter ? persons.filter(peopleThatMatch) : persons;

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    notes.getAll().then((res) => setPersons(res));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification notification={notification} />}
      <Filter filter={filter} handler={filterHandler} />

      <h2>Add New</h2>
      <PersonForm
        handler={submitHandler}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />

      <h2>Numbers</h2>
      {!!persons.length && (
        <Persons persons={contactsToShow} handleDelete={deleteHandler} />
      )}
    </div>
  );
};

export default App;
