import React from 'react'
import { withRouter } from 'next/router'

function profile({ router: { query: { id } } }) {

  return (
    <div className='main'>
      <h1 className='heading'>
        User profile:
        {' '}
        <b className='username'>{id}</b>
      </h1>
      <style jsx>{`
        .main {
          padding: 100px;
        }

        .heading {
          font: 15px Monaco;
        }

        .username {
          color: blue;
        }
      `}</style>
    </div>
  )
}

export default withRouter(profile)