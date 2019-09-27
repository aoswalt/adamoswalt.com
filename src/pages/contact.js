import React from 'react'
import Layout from '../components/layout'
import { css } from '@emotion/core'

export default function ContactPage() {
  const contactLabel = css`
    font-weight: bold;
    margin-right: 1rem;
  `

  return (
    <Layout>
      <h1>Contact</h1>
      <div className='panel panel-default'>
        <div className='panel-body'>
          <p>
            <span css={contactLabel}>GitHub</span>
            <a href='https://www.github.com/aoswalt'>
              https://www.github.com/aoswalt
            </a>
          </p>
          <p>
            <span css={contactLabel}>LinkedIn</span>
            <a href='http://www.linkedin.com/in/aoswalt'>
              http://www.linkedin.com/in/aoswalt
            </a>
          </p>
          <p>
            <span css={contactLabel}>E-Mail</span>
            <a href='mailto:email@adamoswalt.com'>email@adamoswalt.com</a>
          </p>
          <br />
          <p>
            Feel free to have a look around, check out my work, and get in
            touch with me. I would love to hear from you!
          </p>
        </div>
      </div>
    </Layout>
  )
}
