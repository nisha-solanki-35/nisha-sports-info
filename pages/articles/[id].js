import React from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import commentIcon from '../../images/icons8-comments-48.png'
import styles from '../../styles/Home.module.css'
import { Container } from 'reactstrap'
import { useRouter } from 'next/router'

const id = ({ data }) => {
  const router = useRouter()
  const articleDetails = data.data

  console.log('articleDetails', articleDetails)
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div className={styles.article_section}>
        <img
          alt='Image not found'
          className={styles.articleImage}
          src={articleDetails.sImage}
        />
        <img src={commentIcon} alt='No image' />
        <h3>{articleDetails.sTitle}</h3>
        <div dangerouslySetInnerHTML={{ __html: articleDetails.sDescription }}></div>
      </div>
    </Container>
  )
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
