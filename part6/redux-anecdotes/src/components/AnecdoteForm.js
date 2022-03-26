import React from "react";
import { connect } from "react-redux";

import { actions } from "../reducers/anecdoteReducer";
import { actions as msgActions } from "../reducers/messageReducer";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnecdote = (e) => {
    e.preventDefault();
    const contentTarget = e.target.content;
    const content = contentTarget.value;
    if (!content.trim()) return;

    const newAnecdote = { content, votes: 0 };

    createAnecdote(newAnecdote).then((anecdoteAction) => {
      const message = `you added "${anecdoteAction.payload.content}"`;
      setNotification(message);
      contentTarget.value = "";
    });
  };

  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" type="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  ...actions,
  ...msgActions,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
