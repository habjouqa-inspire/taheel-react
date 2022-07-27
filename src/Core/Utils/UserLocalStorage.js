/* eslint-disable */
const getCurrentUser = () => {
  const loggedInUser = localStorage.getItem('currentUser');
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  }
  return { firstName: "", lastName: "" };
};
const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};
const getAlignmentFlag = (alignment) => {
  return localStorage.getItem('alignment');
};
const setAlignmentFlag = (alignment) => {
  localStorage.setItem('alignment', alignment);
};
const logoutUser = (props) => {
  localStorage.clear();
};
export { getCurrentUser, logoutUser, setCurrentUser, setAlignmentFlag, getAlignmentFlag };
