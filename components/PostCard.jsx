import * as React from 'react'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'

export const PostCard = ({ post }) => {
  return (
    <Link href={post.__url}>
      <a data-sb-object-id={post.__id}>
        <h3 data-sb-field-path=".title">{post.title}</h3>
        {post.excerpt && <Markdown data-sb-field-path=".excerpt">{post.excerpt}</Markdown>}
      </a>
    </Link>
  )
}