import axios from 'axios'
// import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap'
import Link from 'next/link'

export const getStaticProps = async () => {
  const response = await axios.post('https://backend.sports.info/api/v1/posts/recent')
  const data = await response?.data

  console.log('data', data)
  return {
    props: {
      data
    }
  }
}

export default function Home ({data}) {
  const posts = data.data
  console.log('data', posts)
  return (<>
      {posts.map((data, index) =>
        <Card key={index}>
          <CardImg
            alt='Card image cap'
            src={data.sImage}
            top
            width='100px'
          />
          <CardBody>
            <CardTitle tag="h5">
              <Link
                href='articles/[slug]'
              >
                {data.sTitle}
              </Link>
            </CardTitle>
            <CardText>
              <div>
                {data.sDescription}
              </div>
              <div className='d-flex justify-content-between'>
                <div className='d-inline-flex'>
                  <p>{data.iId && data.iId.sFirstName ? data.iId.sFirstName : ''}</p>
                  <p>{data.iId && data.iId.sLastName ? data.iId.sLastName : ''}</p>
                </div>
                <div className='d-inline-flex'>
                  <p>{data.nCommentsCount}</p>
                  <p>{data.nViewCounts}</p>
                </div>
              </div>
            </CardText>
            <Button>
              Button
            </Button>
          </CardBody>
        </Card>)
      }
    </>
  )
}
