import React from "react"
import Layout from "../components/layout"
import { css } from "@emotion/core"
import { useTheme } from "emotion-theming"
import { graphql, useStaticQuery } from "gatsby"

function DocumentLink({ href }) {
  const theme = useTheme()

  return (
    <a href={href}>
      <ng-include
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
        margin-bottom: 3rem;
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

  const experienceData = useStaticQuery(graphql`
    query experience {
      allExperienceJson {
        nodes {
          title
          dates
          location
          summary
          highlights
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
        <section className="panel panel-default">
          <div className="panel-heading">
            <h2>Experience</h2>
          </div>
          <div className="panel-body">
            {experienceData.allExperienceJson.nodes.map(e => (
              <Experience experience={e} />
            ))}
          </div>
        </section>
        <section className="panel panel-default">
          <div className="panel-heading">
            <h2>Projects</h2>
          </div>
          <div className="panel-body">
            <p>
              <span css={classes.projectTitle}>U-Shirt</span>A vector-based
              t-shirt designer web application focused on shareability
            </p>
            <p>
              <span css={classes.projectTitle}>Lettering Automation</span>
              Automation of the creation of artwork through templates based on
              order details
            </p>
            <p>
              <span css={classes.projectTitle}>Reporting Tool</span>A tool to
              easily get order information and manage custom reports
            </p>
            <p>
              <span css={classes.projectTitle}>Particle System</span>A simple
              particle system influenced by gravity built using only native Java
              libraries
            </p>
            <p>
              <span css={classes.projectTitle}>Path Builder</span>A configurable
              program to get file paths from inconsistent file structure based
              on order details
            </p>
            <p>
              <span css={classes.projectTitle}>Automated Exporter</span>
              Using CorelDraw VBA, automated the processing and exporting of
              inconsistent files
            </p>
            <p>
              <span css={classes.projectTitle}>Account Database</span>
              Built Access database to fit into office workflow and provide aid
              through automation
            </p>
          </div>
        </section>
        <section className="panel panel-default">
          <div className="panel-heading">
            <h2>Technologies</h2>
          </div>
          <div className="panel-body">
            <h3>Languages</h3>
            <p>Proficient with: JavasScript, Python, SQL, HTML/CSS, C#</p>
            <p>Familiar with Regular Expressions, Git, VBA, Java</p>
            <p>Basic knowledge of Bash, C/C++, PHP</p>
            <h3>Frameworks</h3>
            <p>AngularJS, SASS, Bootstrap, Django, Django Rest Framework</p>
            <h3>Software</h3>
            <p>CorelDRAW, Excel</p>
          </div>
        </section>
        <section className="panel panel-default">
          <div className="panel-heading">
            <h2>Technical Skills</h2>
          </div>
          <div className="panel-body">
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
          </div>
        </section>
        <section className="panel panel-default">
          <div className="panel-heading">
            <h2>Education</h2>
          </div>
          <div className="panel-body">
            <div>
              <h4>Nashville Software School, Nashville, TN</h4>
              <p>Apprentice Software Developer</p>
            </div>
            <br />
            <div>
              <h4>ITT Technical Institute, Cordova, TN</h4>
              <p>
                Associate of Applied Science Degree in Information Technology –
                Multimedia
              </p>
              <p>Valedictorian GPA: 3.97</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
