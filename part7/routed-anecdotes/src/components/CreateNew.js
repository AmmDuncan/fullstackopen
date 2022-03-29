import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text", "content");
  const author = useField("text", "author");
  const info = useField("text", "info");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...content.props} />
        </div>
        <div>
          author <input {...author.props} />
        </div>
        <div>
          url for more info <input {...info.props} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
