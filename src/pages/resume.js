import React from "react"
import Layout from "../components/Layout"
import Panel from "../components/Panel"
import { css } from "@emotion/core"
import { useTheme } from "emotion-theming"
import { graphql, useStaticQuery } from "gatsby"
import Doc from "../images/document.svg"
import SEO from '../components/SEO'

function DocumentLink({ href }) {
  const theme = useTheme()

  return (
    <a href={href}>
      <Doc
        css={css`
          fill: ${theme.colors.link};
          margin-left: 1rem;
          padding-top: .1rem;
        `}
      />
    </a>
  )
}

function Experience({ children, experience }) {
  const theme = useTheme()

  const classes = {
    experience: css`
      &:not(:last-of-type) {
        border-bottom: 1px solid ${theme.colors.bodyBackground};
        margin-bottom: 2rem;
        padding-bottom: 1rem;
      }
    `,
    title: css`
      font-weight: bold;
    `,
    location: css`
      margin-left: 6rem;
    `,
  }

  const { title, location, dates, summary, highlights } = experience

  return (
    <div css={classes.experience}>
      <h4 css={classes.title}>{title}</h4>
      <p>
        {dates}
        <span css={classes.location}>{location}</span>
      </p>
      <p>{summary} </p>
      <ul>
        {highlights.map(h => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </div>
  )
}

function Project({ project }) {
  const { title, shortDescription } = project

  return (
    <p>
      <span
        css={css`
          font-weight: bold;
          margin-right: 2rem;
        `}
      >
        {title}
      </span>
      {shortDescription}
    </p>
  )
}

export default function ResumePage() {
  const classes = {
    projectTitle: css`
      font-weight: bold;
      margin-right: 2rem;
    `,
    skills: css`
      & li {
        font-size: 1.75rem;
      }
    `,
  }

  const resumeData = useStaticQuery(graphql`
    query resume {
      allExperienceJson {
        nodes {
          title
          dates
          location
          summary
          highlights
        }
      }
      allProjectsJson {
        nodes {
          title
          shortDescription
        }
      }
      resumePdf: file(relativePath: { eq: "adam_oswalt-resume.pdf" }) {
        publicURL
      }
    }
  `)

  return (
    <Layout>
      <SEO title='Résumé' />
      <div className="container">
        <h1>
          Résumé
          <DocumentLink href={resumeData.resumePdf.publicURL} />
        </h1>
        <Panel heading="Experience">
          {resumeData.allExperienceJson.nodes.map(e => (
            <Experience experience={e} />
          ))}
        </Panel>
        <Panel heading="Projects">
          {resumeData.allProjectsJson.nodes.map(p => (
            <Project project={p} />
          ))}
        </Panel>
        <Panel heading="Technologies">
          <h3>Languages</h3>
          <p>Proficient with: Elixir, Javascript, SQL, HTML/CSS, Regular Expressions, Bash</p>
          <p>Familiar with: Git, Rust, Lua, VBA, C#, Java</p>
          <h3>Frameworks</h3>
          <p>Phoenix, ReactJS</p>
          <h3>Software</h3>
          <p>CorelDRAW, Excel</p>
        </Panel>
      </div>
    </Layout>
  )
}
