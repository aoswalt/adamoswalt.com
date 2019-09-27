import React from "react"
import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby"
import { css } from '@emotion/core'

/*
Need to implement modal for projects

projects.openModal = (imageUrl) => $uibModal.open({
  template: `<div class="image-modal modal-body"><img src="${imageUrl}" /></div>`,
  size: 'lg'
})



.image-modal {
  text-align: center;

  img {
    border: 2px solid $black;
    max-height: 100%;
    max-width: 100%;
  }
}
*/


function Project({ project }) {
  const classes = {
    title: css`
      margin-left: 2rem;
    `,
    techLabel: css`
      font-weight: bold;

      &::after {
        content: ': ';
        margin-right: .75rem;
      }
    `,
    source: css`
      font-weight: bold;
      margin-right: 1.25rem;
    `,
    live: css`
      font-weight: bold;
    `,
    thumb: css`
      cursor: pointer;

      &:hover {
        border: 4px solid $link-color;
      }
    `,
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h2 css={classes.title}>{project.title}</h2>
      </div>
      <div className="panel-body media">
        <div className="media-left">
          <img
            className="thumb media-object"
            css={classes.thumb}
            height="150px"
            ng-click="projects.openModal('images/' + project.image)"
            src="images/thumbs/{{project.image}}"
            width="250px"
            alt="tmp"
          />
        </div>
        <div className="media-body">
          <p>
            <span css={classes.techLabel}>Technologies</span>
            {project.technologies}
          </p>
          <p>{project.description}</p>
          <p>
            <span css={classes.source}>
              <a href={project.sourceUrl}>Source Code</a>
            </span>
            <span css={classes.live} ng-show="project.liveUrl">
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
          liveUrl
          sourceUrl
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
