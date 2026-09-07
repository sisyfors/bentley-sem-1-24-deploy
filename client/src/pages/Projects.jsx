import { useState } from "react";
import "./Projects.css";
import AddProject from "./AddProject";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const [projects, setProjects] = useState([

  ]);

  const [showAddProject, setShowAddProject] = useState(false);

  const addProject = (newProject) => {
    setProjects((previousProjects) => [
      ...previousProjects,
      {
        id: previousProjects.length + 1,
        ...newProject
      }
    ]);

    setShowAddProject(false);
  };

  return (
    <div className="projects-box">
      <div className="projects-header">
        <h4>Available Projects</h4>
        <button
          className="add-project-btn"
          onClick={() => setShowAddProject(true)}
        >
          + Add Project
        </button>
        {showAddProject && (
          <AddProject
            onAddProject={addProject}
            onCancel={() => setShowAddProject(false)}
          />
        )}
      </div>
        <div className="projects-container">

          <div className="project-list-section">
            <div className="project-list-header">
              <h3>Projects List</h3>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-item"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.name}
                </div>
              ))}
            </div>
          </div>

          <div className="project-description">
            <h3>Description</h3>

            {selectedProject ? (
              <>
                <p>{selectedProject.description}</p>
              </>
            ) : (
              <p>Select a project to view details.</p>
            )}
          </div>

        </div>

    </div>
  );
}

export default Projects;