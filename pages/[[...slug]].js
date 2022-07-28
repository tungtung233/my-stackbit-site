import Head from 'next/head';

import { DynamicComponent } from '../components/DynamicComponent';
import { Footer } from '../components/Footer';
import { pagesByType, siteConfig, urlToContent } from '../utils/content';

const FlexiblePage = ({ page, siteConfig }) => {
  return (
    <div className="page">
      <Head>
        <title>{page.title}</title>
      </Head>
      <div data-sb-object-id={page.__id}>
        {page.sections?.length > 0 && (
          <div data-sb-field-path="sections">
            {page.sections.map((section, index) => (
              <DynamicComponent
                key={index}
                {...section}
                data-sb-field-path={`.${index}`}
              />
            ))}
          </div>
        )}
      </div>
      <Footer siteConfig={siteConfig} />
    </div>
  );
};

export default FlexiblePage;

export function getStaticProps({ params }) {
  const url = '/' + (params.slug || []).join('/');
  let page = urlToContent(url);

  // Get all posts and sort by date, newest first
  let posts = Object.values(pagesByType('Post'));
  posts = posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // If there's any PostFeed component in the sections list,
  //inject the posts data to it. How would you make this more generic?
  page.sections.map((section) => {
    if (section.type === 'PostFeed') section.posts = posts;
  });

  return { props: { page, siteConfig: siteConfig() } };
}

export function getStaticPaths() {
  const pages = pagesByType('Page');
  return {
    paths: Object.keys(pages),
    fallback: false,
  };
}
