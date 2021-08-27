import NextLink from "next/link"
import useSWR from 'swr'
import Head from "next/head"
import Footer from "../components/Footer"

export default function Index() {
  const { data, error } = useSWR('/api/getAllPosts')
  if (error) {
    return <div>Error loading posts</div>
  }

  return (
    <>
      <Head>
        <title>coffeeclass.io Engineering</title>
        <meta name="description" content="Behind the scenes of coffeeclass.io"></meta>
      </Head>
      <div className="wrapper">
        <div className="header-wrapper">
          <p style={{ fontSize: '40px' }}>☕⚙️✍️</p>
          <h1 className="text-h1-main">coffeeclass.io Engineering</h1>
          <p className="text-p-main">A behind the scenes look of <a href="https://coffeeclass.io" target="_blank" rel="noreferrer">coffeeclass.io</a> from the engineering team.</p>
        </div>
        {/* overriding max width for this page only */}
        <div className="inner-wrapper" style={{ maxWidth: '400px' }}>
          <ul>
            {data && data.json.filter(p => p.published == true).map((post, index) => (
              console.log(post),
              <li key={index}>
                <NextLink href="/[slug]" as={`/${post?.slug}`}>
                  <a href={`/${post?.slug}`}>
                    {post?.title}
                  </a>
                </NextLink>
              </li>
            ))}
          </ul>
          <Footer />
        </div>
      </div>
    </>
  )
}