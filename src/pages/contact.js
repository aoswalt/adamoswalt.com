import React from 'react'
import Layout from '../components/layout'

export default function ContactPage() {
  return (
    <Layout>
      <div className='container'>
        <h1>Contact</h1>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <p>
              <span className='contact-label'>GitHub</span>
              <a href='https://www.github.com/aoswalt'>
                https://www.github.com/aoswalt
              </a>
            </p>
            <p>
              <span className='contact-label'>LinkedIn</span>
              <a href='http://www.linkedin.com/in/aoswalt'>
                http://www.linkedin.com/in/aoswalt
              </a>
            </p>
            <p>
              <span className='contact-label'>E-Mail</span>
              <a href='mailto:email@adamoswalt.com'>email@adamoswalt.com</a>
            </p>
            <br />
            <p>
              Feel free to have a look around, check out my work, and get in
              touch with me. I would love to hear from you!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
