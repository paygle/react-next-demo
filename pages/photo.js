import React from 'react'
import { withRouter } from 'next/router'
import Photo from '../components/frame'

function PhotoWrap({ router: { query: { id } } }) {
  return (
    <div className='permalink'>
      <div className='wrap'>
        <Photo id={id} />
      </div>
      <style jsx>{`
        .permalink {
          padding: 100px;
          text-align: center;
        }

        .wrap {
          display: inline-block;
          border: 1px solid #999;
          margin: auto;
        }
      `}</style>
    </div>
  )
}

export default withRouter(PhotoWrap)