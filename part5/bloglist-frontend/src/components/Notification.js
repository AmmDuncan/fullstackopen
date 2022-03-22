const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 24px',
    border: `4px solid ${message.error ? '#b33' : '#393'}`,
    borderRadius: '8px',
    background: '#ccc',
    color: `${message.error ? '#b33' : '#393'}`,
    fontSize: '20px',
  };

  return (
    <div style={style}>
      {message.body}
    </div>
  );
};

export default Notification;
