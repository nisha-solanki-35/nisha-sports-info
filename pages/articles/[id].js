import React from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import styles from '../../styles/Home.module.css'
import { Container } from 'reactstrap'
import { useRouter } from 'next/router'
import Loader from 'react-loader-spinner'

const id = ({ data }) => {
  const router = useRouter()
  const articleDetails = data && data.data

  if (router.isFallback) {
    return(
      <Loader
        type='Rings'
        color='black'
        height={90}
        width={90}
        className={styles.loader}
      />
    )
  } else {
  return (
    <Container>
      <div className={styles.article_section}>
        <img
          alt='Image not found'
          className={styles.articleImage}
          src={articleDetails.sImage}
        />
        <h3 className='mt-5'>{articleDetails.sTitle}</h3>
        <div dangerouslySetInnerHTML={{ __html: articleDetails.sDescription }}></div>
      </div>
    </Container>
  )}
}

export async function getStaticPaths () {
  const response = await axios.post('https://backend.sports.info/api/v1/posts/recent')
  const articles = await response.data

  const paths = articles.data.map((article) => {
    return {
      params: { id: article._id }
    }
  })

  return { paths, fallback: true }
}

export async function getStaticProps ({ params }) {
  const response = await axios.get(`https://backend.sports.info/api/v1/posts/view/${params.id}`)
  const article = await response.data

  return { props: { data: article } }
}

id.propTypes = {

}

export default id
