const sort = (list, prop = null) => {
  const newList = [...list];
  newList.sort((a, b) => !prop
    ? b - a
    : b[prop] - a[prop]);
  return newList;
}

export default sort;
