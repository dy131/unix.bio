import React, { useMemo } from 'react'
import { msToString } from '../data-transform'
import { Image, useTheme } from '@zeit-ui/react'
import BLOG from '../../blog.config'
import { useRouter } from 'next/router'

const DateDisplay = ({ date }) => {
  const theme = useTheme()
  const d = useMemo(() => new Date(date), [])
  if (`${d}` === 'Invalid Date') return null
  const time = Date.now() - d.getTime()
  const locale = BLOG.cn ? 'zh-cn' : 'en-us'

  return (
    <p>
      <span className="dot">﹥</span>
      {d.toLocaleString(locale).replace(/\//g, '-')}
      <span className="split"> / </span>
      {msToString(time)}
      <style jsx>{`
      p {
        color: ${theme.palette.accents_4};
        font-size: .8rem;
        display: inline-flex;
        align-items: center;
        font-family: ${theme.font.mono};
      }
      
      span {
        user-select: none;
        font-weight: bold;
      }
      
      .dot {
        color: ${theme.palette.accents_7};
        padding-right: 2px;
      }
      
      .split {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        color: ${theme.palette.success};
        padding: 0 .5rem;
      }
      
      @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
        p {
          text-align: center;
        }
      }
    `}</style>
    </p>
  )
}

const Title = ({
  title, date,
}) => {
  const theme = useTheme()
  const { asPath } = useRouter()
  const showViews = useMemo(() => BLOG.enableViews, [])
  const url = useMemo(() => {
    const suffix = BLOG.cn ? '%20阅读' : '%20views'
    const params = 'size=12&fill=999999&family=Menlo,%20Monaco,%20Lucida%20Console,%20Liberation%20Mono'
    return `https://views.show/svg?key=${asPath}&suffix=${suffix}&${params}`
  }, [asPath])
  
  return (
    <div className="title">
      <h1>{title}</h1>
      <div className="date-box">
        <DateDisplay date={date} />
        {showViews && <Image width={100} height={24} src={url} draggable={false} />}
      </div>
  
      <style jsx>{`
        .title {
          margin: ${theme.layout.gap} 0;
        }

        .date-box {
          display: flex;
          width: fit-content;
          align-items: center;
          height: 30px;
          margin: -.5rem 0 0 0;
          position: relative;
        }
        
        .date-box :global(.image) {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          margin: 0 0 0 10px;
        }
        
        .date-box :global(img) {
          object-fit: unset;
        }
        
        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .date-box {
            justify-content: center;
            margin: 0 auto;
          }
          
          .date-box :global(.image) {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Title
