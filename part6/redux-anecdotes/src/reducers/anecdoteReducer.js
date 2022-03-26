import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);
const initialState = [];

const fetchInitialAnecdotes = createAsyncThunk("anecdotes/fetchInitial", () => {
  return anecdoteService.getAll();
});

const createAnecdote = createAsyncThunk(
  "anecdotes/createAnecdote",
  (anecdote) => anecdoteService.addOne(anecdote)
);

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload.id;
      const quoteToVoteFor = state.find((quote) => quote.id === id);
      const updatedQuote = {
        ...quoteToVoteFor,
        votes: quoteToVoteFor.votes + 1,
      };
      return state.map((quote) => (quote.id !== id ? quote : updatedQuote));
    },
    addAnecdote(state, action) {
      return [...state, action.payload.anecdote];
    },
    setAnecdotes(state, action) {
      return action.payload.anecdotes || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialAnecdotes.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createAnecdote.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
  },
});

// trying course approach
const voteForAnecdote = (id) => {
  return (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdote = { ...anecdotes.find((a) => a.id === id) };
    anecdote.votes += 1;
    anecdoteService.updateOne(id, anecdote).then((updated) => {
      dispatch(anecdoteReducer.actions.vote({ id }));
    });
  };
};

const customActions = {
  fetchInitialAnecdotes,
  createAnecdote,
  voteForAnecdote,
};

export const actions = { ...anecdoteReducer.actions, ...customActions };
export default anecdoteReducer.reducer;
