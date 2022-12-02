export const trimTitle = (name) => {
  if (name.length >= 20) {
    return name.slice(0, 20).concat(" ...");
  } else {
    return name;
  }
};
