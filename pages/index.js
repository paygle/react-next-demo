import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import Modal from '../components/modal'
import Head from 'next/head'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider, DatePicker } from 'antd'
import Moment from 'moment'
import 'moment/locale/zh-cn'

class Index extends React.Component {
  static getInitialProps () {
    return {
      photos: new Array(15).fill(0).map((v, k) => k + 1)
    }
  }

  constructor (props) {
    super(props)
    const _this = this;

    // 受控组件绑定方法，推荐使用
    ['onKeyDown', 'onChange'].forEach((v) => {
      if (_this[v] && typeof _this[v] === 'function') _this[v] = _this[v].bind(_this);
    })

    // 定义状态
    this.state = { dt: '' }
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

  onChange(date, dateString) {
    this.setState({dt: dateString}); // 修改数据状态
    console.log(date, dateString);
  }

  render () {
    const { photos, router } = this.props

    return (
      <LocaleProvider locale={zhCN}>
        <div className="just-onlyone">
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta charSet='utf-8' />
            <link rel='stylesheet' href='/_next/static/style.css' />
          </Head>
          <DatePicker onChange={this.onChange} defaultValue={Moment()}/>
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
        </div>
      </LocaleProvider>
    )
  }
}

export default withRouter(Index)
