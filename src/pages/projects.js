import React from "react"
import Layout from "../components/Layout"
import Panel from "../components/Panel"
import { graphql, useStaticQuery } from "gatsby"
import { css } from "@emotion/core"
import Img from "gatsby-image"

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
    techLabel: css`
      font-weight: bold;

      &::after {
        content: ": ";
        margin-right: 0.75rem;
      }
    `,
    source: css`
      font-weight: bold;
      margin-right: 1.25rem;
    `,
    live: css`
      font-weight: bold;
    `,
    container: css`
      display: flex;
    `,
    thumb: css`
      cursor: pointer;
      margin-right: 1rem;

      &:hover {
        border: 4px solid $link-color;
      }
    `,
    description: css`
      flex: 1;
    `,
    footer: css`
      display: flex;
      justify-content: space-between;
    `,
  }

  return (
    <Panel heading={project.title}>
      <div css={classes.container}>
        <Img
          css={classes.thumb}
          // ng-click="projects.openModal('images/' + project.image)"
          fixed={project.thumbnail.childImageSharp.fixed}
          alt="tmp"
        />
        <div css={classes.description}>
          <p>
            <span css={classes.techLabel}>Technologies</span>
            {project.technologies}
          </p>
          <p>{project.description}</p>
          <p css={classes.footer}>
            <span>
              <a css={classes.source} href={project.sourceUrl}>
                Source Code
              </a>
              {project.liveUrl && (
                <a css={classes.live} href={project.liveUrl}>
                  Live
                </a>
              )}
            </span>
            <span>Last Update: {project.lastUpdate}</span>
          </p>
        </div>
      </div>
    </Panel>
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
          description
          technologies
          thumbnail {
            childImageSharp {
              fixed(width: 250, height: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          image {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }
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
