import "./Header.css";
import taskDutyLogo from "../assets/taskduty-logo.png";
import profileImage from "../assets/Profile-pic.png";

function Header({ page, setPage }) {
  return (
    <header className="header">
      <div className="header-container">
        <button className="header-logo" onClick={() => setPage("home")}>
          <img src={taskDutyLogo} alt="TaskDuty logo" />
          <span>TaskDuty</span>
        </button>

        <div className="header-actions">
          <nav className="header-nav">
            {page === "home" && (
              <>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage("new-task");
                  }}
                >
                  New Task
                </a>

                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage("tasks");
                  }}
                >
                  All Tasks
                </a>
              </>
            )}

            {(page === "new-task" || page === "edit-task") && (
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage("tasks");
                }}
              >
                All Tasks
              </a>
            )}

            {page === "tasks" && (
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage("new-task");
                }}
              >
                New Task
              </a>
            )}
          </nav>

          <div className="header-profile">
            <img src={profileImage} alt="Profile-pic" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
