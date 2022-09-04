const makeBackup = (state) => {
  sessionStorage.setItem("state", JSON.stringify(state));
};

const getBackup = () => {
  try {
    const backup = JSON.parse(sessionStorage.getItem("state"));
    // but elevators are stopped moving and waiting =>
    backup.elevators.map((elevator) => {
      elevator.moving = false;
      elevator.waiting = false;
      return elevator;
    });

    return backup;
  } catch {
    return {};
  }
};

export { makeBackup, getBackup };
