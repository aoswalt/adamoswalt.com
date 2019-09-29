import React from "react"
import Layout from "../components/Layout"
import Panel from "../components/Panel"
import { css } from "@emotion/core"
import { useTheme } from "emotion-theming"
import { graphql, useStaticQuery } from "gatsby"

function DocumentLink({ href }) {
  const theme = useTheme()

  return (
    <a href={href}>
      <img
        css={css`
          & svg {
            fill: ${theme.colors.link};
            height: 2rem;
          }
        `}
        src="images/document.svg"
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
          <li>{h}</li>
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
    }
  `)

  return (
    <Layout>
      <div className="container">
        <h1>
          Résumé
          <DocumentLink href="adam_oswalt-resume.pdf" />
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
          <p>Proficient with: JavasScript, Python, SQL, HTML/CSS, C#</p>
          <p>Familiar with Regular Expressions, Git, VBA, Java</p>
          <p>Basic knowledge of Bash, C/C++, PHP</p>
          <h3>Frameworks</h3>
          <p>AngularJS, SASS, Bootstrap, Django, Django Rest Framework</p>
          <h3>Software</h3>
          <p>CorelDRAW, Excel</p>
        </Panel>
        <Panel heading="Technical Skills">
          <ul css={classes.skills}>
            <li>Proficient with Windows</li>
            <li>Familiar with Linux</li>
            <li>Built multiple personal computers</li>
            <li>Performed basic laptop repair</li>
            <li>Proficient with Microsoft Office Suite</li>
            <li>Proficient with CorelDraw</li>
            <li>Familiar with Photoshop</li>
            <li>Basic knowledge of Illustrator</li>
            <li>Familiar with Blender</li>
          </ul>
        </Panel>
      </div>
    </Layout>
  )
}
