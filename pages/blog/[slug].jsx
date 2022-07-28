import Markdown from 'markdown-to-jsx'

import { pagesByType, urlToContent } from '../../utils/content'

const postPage = ({ post }) => {
  return (
    <div data-sb-object-id={post.__id} className="small-margin">
      <h1 data-sb-field-path="title">{post.title}</h1>
      <Markdown data-sb-field-path="markdown_content">{post.body}</Markdown>
    </div>
  )
}

export function getStaticProps({ params }) {
  const currentPath = `/blog/${params.slug}`
  const post = urlToContent(currentPath)
  return { props: { post } }
}

export function getStaticPaths() {
  const posts = pagesByType('Post')
  return {
    paths: Object.keys(posts),
    fallback: false
  }
}

export default postPage