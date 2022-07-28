import { urlToContent } from '../../utils/content'

const BlogPage = ({ page }) => {
  return (
    <div data-sb-object-id={page.__id}>
      <div className="small-margin">
        <h1 data-sb-field-path="title">{page.title}</h1>
      </div>
    </div>
  )
}


export default BlogPage

export function getStaticProps() {
  const page = urlToContent('/blog')
  return { props: { page } }
}