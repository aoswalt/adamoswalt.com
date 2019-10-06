import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "./Header"
import { css } from "@emotion/core"
import { ThemeProvider, useTheme } from "emotion-theming"
import CssBaseline from "./CssBaseline"

function Nav() {
  const theme = useTheme()

  const navBar = css`
    border-radius: 0;
    box-shadow: 0 0.8rem 0.8rem ${theme.colors.panelShadow};
  `

  const navPills = css`
    display: flex;
    justify-content: center;
    padding-bottom: 0.5rem;
  `

  const navLink = css`
    list-style: none;
    padding-right: 1rem;
    padding-left: 1rem;

    & a {
      color: ${theme.colors.bodyText};
      font-size: 2rem;
      font-weight: bold;
    }

    & a:hover {
      color: ${theme.colors.link};
    }
  `

  return (
    <nav css={navBar}>
      <ul css={navPills}>
        <li css={navLink}>
          <Link to="/">About Me</Link>
        </li>
        <li css={navLink}>
          <Link to="/projects">Projects</Link>
        </li>
        <li css={navLink}>
          <Link to="/resume">Resume</Link>
        </li>
        <li css={navLink}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default function Layout({ children }) {
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
      panelBackground: "rgb(70, 73, 76)",
      panelShadow: "rgb(11, 11, 11)",
      bodyBackground: "rgb(40, 43, 46)",
      bodyText: "white",
      link: "rgb(100, 138, 235)",
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
