import { useState } from "react";
import "./Projects.css";
function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: "Project 1",
      description: "description 1"
    },
    {
      id: 2,
      name: "Project 2",
      description: "description 2"
    },
    {
      id: 3,
      name: "Project 3",
      description: "description 3"
    }
  ];

  return (
    <div className="projects-box">
      <div className="projects-header">
        <h4>Available Projects</h4>
        <button className="add-project-btn">
          + Add Project
        </button>
      </div>
        <div className="projects-container">
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


          {/* Right side */}
          <div className="project-description">
            <h3>Project Description</h3>

            {selectedProject ? (
              <>
                <p>{selectedProject.name}</p>
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