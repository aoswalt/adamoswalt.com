/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"

import Header from "./header"
import "./layout.css"
import { Global, css } from "@emotion/core"
import { ThemeProvider, useTheme } from "emotion-theming"

function GlobalStyles() {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        body {
          background: ${theme.colors.bodyBackground};
        }

        h1 {
          color: rgb(255, 255, 255);
          font-weight: bold;
          position: relative;
          text-align: center;
        }

        h2 {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0.25rem;
        }

        p,
        a {
          font-size: 1.66rem;
        }

        .panel {
          box-shadow: 0.8rem 0.8rem 0.8rem ${theme.colors.panelShadow};
        }

        .panel-heading {
          padding: 0.5rem;
        }
      `}
    />
  )
}

function Nav() {
  const theme = useTheme()

  const navBar = css`
    border-radius: 0;
    box-shadow: 0 0.8rem 0.8rem ${theme.colors.panelShadow};
  `

  const navPills = css`
    display: flex;
    justify-content: center;
  `

  const navLink = css`
    list-style: none;
    & a {
      font-size: 2rem;
      font-weight: bold;
      text-decoration: none;
    }
  `

  return (
    <nav css={navBar}>
      <ul css={navPills}>
        <li css={navLink}>
          <a href="#/about">About Me</a>
        </li>
        <li css={navLink}>
          <a href="#/projects">Projects</a>
        </li>
        <li css={navLink}>
          <a href="#/resume">Resume</a>
        </li>
        <li css={navLink}>
          <a href="#/contact">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const theme = {
    colors: {
      panelShadow: "rgb(11, 11, 11)",
      bodyBackground: "rgb(60, 63, 66)",
      link: "rgb(100, 138, 235)",
    },
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Nav />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
