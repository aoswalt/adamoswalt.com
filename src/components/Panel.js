import React from 'react'
import { css, useTheme } from "@emotion/react"

export default function Panel({ children, heading }) {
  const theme = useTheme()

  const classes = {
    container: css`
      background-color: ${theme.colors.panelBackground};
      box-shadow: 0.8rem 0.8rem 0.8rem ${theme.colors.panelShadow};
      margin-bottom: 2rem;
    `,
    heading: css`
      padding: 1rem 0.5rem 0.5rem 0.5rem;
    `,
    body: css`
      padding: 0 1rem 1rem 1rem;
    `,
  }

  return (
    <section css={classes.container}>
      <h2 css={classes.heading}>{heading}</h2>
      <div css={classes.body}>
        {children}
      </div>
    </section>
  )
}
