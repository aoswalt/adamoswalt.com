import React from 'react'
import { Global, css } from '@emotion/core'
import { useTheme } from "emotion-theming"

export default function CssBaseline() {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        html {
          font-family: "Helvetica", sans-serif;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: inherit;
        }

        strong, b: {
          font-weight: bolder;
        }

        body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${theme.colors.bodyText};
          background-color: ${theme.colors.bodyBackground};

          '@media print': {
            color: black;
            background-color: white;
          }
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

        a {
          text-decoration: none;
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
