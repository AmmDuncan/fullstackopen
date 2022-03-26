import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as anecdoteActions } from "../reducers/anecdoteReducer";
import { actions as messageActions } from "../reducers/messageReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    )
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(anecdoteActions.voteForAnecdote(id));
    const message = `you voted "${anecdotes.find((a) => a.id === id).content}"`;
    dispatch(messageActions.setNotification(message));
  };

  return (
    <React.Fragment>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default AnecdoteList;
