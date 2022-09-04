const makeBackup = (state) => {
  sessionStorage.setItem("state", JSON.stringify(state));
};

const getBackup = () => {
  try {
    return JSON.parse(sessionStorage.getItem("state"));
  } catch {
    return {};
  }
};

export { makeBackup, getBackup };
