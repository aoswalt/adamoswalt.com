import React from "react"
import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby"


/*
Need to implement modal for projects

projects.openModal = (imageUrl) => $uibModal.open({
  template: `<div class="image-modal modal-body"><img src="${imageUrl}" /></div>`,
  size: 'lg'
})
*/


function Project({ project }) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h2>{project.title}</h2>
      </div>
      <div className="panel-body media">
        <div className="media-left">
          <img
            className="thumb media-object"
            height="150px"
            ng-click="projects.openModal('images/' + project.image)"
            src="images/thumbs/{{project.image}}"
            width="250px"
            alt="tmp"
          />
        </div>
        <div className="media-body">
          <p>
            <span className="tech-label">Technologies</span>
            {project.technologies}
          </p>
          <p>{project.description}</p>
          <p>
            <span className="source">
              <a href={project.sourceUrl}>Source Code</a>
            </span>
            <span className="live" ng-show="project.liveUrl">
              <a href={project.liveUrl}>Live</a>
            </span>
            <span className="pull-right">
              Last Update: {project.lastUpdate}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const projectsData = useStaticQuery(graphql`
    query projects {
      allProjectsJson {
        nodes {
          title
          lastUpdate
        }
      }
    }
  `)

  return (
    <Layout>
      <div className="projects container">
        <h1>Projects</h1>
        {projectsData.allProjectsJson.nodes
          .map(d => console.log(d) || d)
          .sort((p1, p2) => p2.lastUpdate?.localeCompare(p1.lastUpdate))
          .map(p => (
            <Project project={p} />
          ))}
      </div>
    </Layout>
  )
}
