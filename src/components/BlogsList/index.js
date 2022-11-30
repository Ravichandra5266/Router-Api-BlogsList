import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {
    blogsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const fetchUrl = await fetch('https://apis.ccbp.in/blogs')
    const response = await fetchUrl.json()
    console.log(response)
    const newFormatedData = response.map(each => ({
      id: each.id,
      avatarUrl: each.avatar_url,
      imageUrl: each.image_url,
      topic: each.topic,
      title: each.title,
    }))
    this.setState({blogsData: newFormatedData}, (isLoading: false))
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
