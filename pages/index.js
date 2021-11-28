import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Button } from 'reactstrap'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function index ({ data }) {
  const [start, setStart] = useState(0)
  const [limit] = useState(4)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    if (data) {
      setArticles(data.data)
    }
  }, [data])

  useEffect(() => {
    start && getMoreArticles()
  }, [start])

  const getMoreArticles = async () => {
    const data = await axios('https://backend.sports.info/api/v1/posts/recent', {
      method: 'POST',
      data: { nStart: start, nLimit: limit, eSort: 'Latest', bRemoveBannerPosts: true },
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'same-origin'
    }).then(response => {
      return response.data
    })

    // const response = await axios.post('https://backend.sports.info/api/v1/posts/recent',
    //   { nStart: start, nLimit: limit, eSort: 'Latest', bRemoveBannerPosts: true })
    // const data = await response?.data

    setArticles(data.data)
    console.log('data.data', data.data)
  }

  return (<>
      {articles.map((data, index) =>
      <section key={index} className={styles.common_box}>
        <div className='d-flex justify-content-start'>
          <img
            alt='Card image cap'
            src={data.sImage}
            className={styles.card_img}
            // top
            // width='100px'
          />
          <div className={styles.text}>
            <h4>
              <Link
                href={`/${data._id}`}
                as={`/articles/${data._id}`}
              >
                {data.sTitle}
              </Link>
            </h4>
              <div>
                {data.sDescription}
              </div>
              <div className={`${styles.info} d-flex justify-content-between`}>
                <p>{`${data.iId && data.iId.sFirstName ? data.iId.sFirstName : ''}  ${data.iId && data.iId.sLastName ? data.iId.sLastName : ''}`}</p>
                <div className='d-inline-flex'>
                  <p>{data.nCommentsCount}</p>
                  <p>{data.nViewCounts}</p>
                </div>
              </div>
              </div>
            </div>
        </section>)
      }
      <div className={styles.load_more_button}>
        <Button color='danger' onClick={() => setStart(start + 4)}>Load More</Button>
      </div>
    </>
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
