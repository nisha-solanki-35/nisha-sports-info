import React from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'

const index = ({ data }) => {
  console.log('data', data)
  return (
    <div>
      <h1>{data.sTitle}</h1>
    </div>
  )
}

export async function getStaticPaths () {
  const response = await axios.post('https://backend.sports.info/api/v1/posts/recent')
  const articles = await response.data

  const paths = articles.data.map((article) => ({
    params: { slug: article.sSlug }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const response = await axios.post(`https://backend.sports.info/api/v1/posts/view/${params.slug}`)
  const article = await response.data
  console.log('article', article)

  return { props: { data: article } }
}

index.propTypes = {

}

export default index
