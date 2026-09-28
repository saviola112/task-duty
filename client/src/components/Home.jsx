import taskIllustration from "../assets/task-illustration.png";
import "./Home.css";
function Home({ setPage }) {
  return (
    <main>
      <section className="home-section">
        <div className="home-content">
          <h2>
            Manage your Tasks on <span>TaskDuty</span>
          </h2>

          <p>
            Organize your tasks, stay on top of your deadlines, and keep
            everything you need to get things done in one place. Plan your day,
            track your progress, and never lose sight of what needs to be done.
          </p>

          <button onClick={() => setPage("tasks")}>Go To My Tasks</button>
        </div>

        <div className="home-image">
          <img src={taskIllustration} alt="Task management illustration" />
        </div>
      </section>
    </main>
  );
}

export default Home;
