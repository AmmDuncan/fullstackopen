const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    localStorage.setItem('user', '');
    return null;
  }
};

const setUser = (val) => {
  const jsonFormat = JSON.stringify(val);
  localStorage.setItem('user', jsonFormat);
};

const clearUser = () => {
  localStorage.removeItem('user');
};

const sessionData = {
  setUser,
  clearUser,
  getUser,
};

export default sessionData;
