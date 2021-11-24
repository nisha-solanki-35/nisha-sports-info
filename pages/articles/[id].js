import React from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'
import commentIcon from '../../images/icons8-comments-48.png'

const id = ({ data }) => {
  const articleDetails = data.data
  console.log('articleDetails', articleDetails)
  return (
    <div>
      <Card>
        <CardImg
          alt='Card image cap'
          src={articleDetails.sImage}
          top
        />
        <img src={commentIcon} />
        <CardTitle>{articleDetails.sTitle}</CardTitle>
        <CardBody>
          <div dangerouslySetInnerHTML={{ __html: articleDetails.sDescription }}></div>
        </CardBody>
      </Card>
    </div>
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

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const response = await axios.get(`https://backend.sports.info/api/v1/posts/view/${params.id}`)
  const article = await response.data

  return { props: { data: article } }
}

id.propTypes = {

}

export default id
