import { pagesByType, urlToContent } from '../../utils/content'
// Import PostCard component
import { PostCard } from '../../components/PostCard'

const BlogPage = ({ page, posts }) => {
  return (
    <div data-sb-object-id={page.__id}>
      <div className="small-margin">
        <h1 data-sb-field-path="title">{page.title}</h1>
        {/* Loop through posts and add a card for each. */}
        {posts && posts.map((post) => <PostCard key={post.__id} post={post} />)}
      </div>
    </div>
  )
}

export default BlogPage

export function getStaticProps() {
  const page = urlToContent('/blog')
  // Get all posts and sort by date, newest first
  let posts = Object.values(pagesByType('Post'))
  posts = posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  return { props: { page, posts } }
}
