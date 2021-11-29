import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Container } from 'reactstrap'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Loader from 'react-loader-spinner'

export default function index ({ data }) {
  const [start, setStart] = useState(0)
  const [limit] = useState(4)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const previousProps = useRef({ articles }).current

  useEffect(() => {
    if (data) {
      setArticles(data.data)
    }
  }, [data])

  useEffect(() => {
    if(start && start >= 4) {
      getMoreArticles()
      setLoading(true)
    }
  }, [start])

  const getMoreArticles = async () => {
    // const data = axios('https://backend.sports.info/api/v1/posts/recent', {
    //   method: 'POST',
    //   data: { nStart: start, nLimit: limit, eSort: 'Latest', bRemoveBannerPosts: true },
    //   mode: 'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json'
    //   },
    //   withCredentials: true,
    //   credentials: 'same-origin'
    // }).then(response => {
    //   return response.data
    // })

    const response = await axios.post('https://backend.sports.info/api/v1/posts/recent',
      { nStart: start, nLimit: limit, eSort: 'Latest', bRemoveBannerPosts: true })
    const data = await response?.data?.data
    console.log(`articles`, articles)
    setArticles([...articles, ...data])
    setLoading(false)
    return articles
  }

  return (<Container>
      <Image
        src='/sportsinfo.svg'
        width={100}
        height={100}
        className={styles.logo}
      >
      </Image>
      {previousProps.articles !== articles && articles.map((data, index) =>
      <section key={index} className={styles.common_box}>
        <div className='d-flex justify-content-start'>
          <img
            alt='Card image cap'
            src={data.sImage}
            className={styles.card_img}
          />
            <div className={styles.text}>
              <Link
                href={`/${data._id}`}
                as={`/articles/${data._id}`}
                className={styles.title}
              >
                {data.sTitle}
              </Link>
              <div>
                {data.sDescription}
              </div>
              <div className={`${styles.info} d-flex justify-content-between`}>
                <p>{`${data.iId && data.iId.sFirstName ? data.iId.sFirstName : ''}  ${data.iId && data.iId.sLastName ? data.iId.sLastName : ''}`}</p>
                <div className='d-inline-flex'>
                  <img src='/icons8-comments-48.png' className={styles.comment}></img><p className={styles.icon_text}>{data.nCommentsCount}</p>
                  <img src='/view.png' className={styles.view}></img><p className={styles.icon_text}>{data.nViewCounts}</p>
                </div>
              </div>
              </div>
            </div>
        </section>)
      }
      {loading ? <Loader
        type='Rings'
        color='black'
        height={70}
        width={70}
        className={styles.loader}
      /> : <div className={styles.load_more_button}>
      <Button color='danger' onClick={() => setStart(start + 4)}>Load More</Button>
    </div>}
    </Container>
  )
}

export const getStaticProps = async () => {
  const response = await axios.post('https://backend.sports.info/api/v1/posts/recent')
  // { nStart: 0, nLimit: 4, eSort: 'Latest', bRemoveBannerPosts: true })
  const data = await response?.data

  return {
    props: {
      data
    }
  }
}

index.propTypes = {
  data: PropTypes.object
}
