import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

import Modal from '../components/modal'

class Index extends React.Component {
  static getInitialProps () {
    return {
      photos: new Array(15).fill(0).map((v, k) => k + 1)
    }
  }

  constructor (props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  // handling escape close
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown (e) {
    if (!this.props.router.query.photoId) return
    if (e.keyCode === 27) {
      this.props.router.back()
    }
  }

  dismissModal () {
    this.props.router.push('/')
  }

  showPhoto (e, id) {
    e.preventDefault()
    this.props.router.push(`/?photoId=${id}`, `/photo?id=${id}`)
  }

  render () {
    const { photos, router } = this.props

    return (
      <div className='list'>
        {
          router.query.photoId &&
            <Modal
              id={router.query.photoId}
              onDismiss={() => this.dismissModal()}
            />
        }
        {
          photos.map((id) => (
            <div key={id} className='photo'>
              <Link href={`/photo?id=${id}`}>
                <a
                  className='photoLink'
                  onClick={(e) => this.showPhoto(e, id)}
                >
                  {id}
                </a>
              </Link>
            </div>
          ))
        }
        <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo {
            display: inline-block;
          }

          .photoLink {
            color: #333;
            vertical-align: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 250px;
            margin: 10px;
            border: 2px solid transparent;
          }

          .photoLink:hover {
            border-color: blue;
          }
        `}</style>
      </div>
    )
  }
}

export default withRouter(Index)
