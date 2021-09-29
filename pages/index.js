import NextLink from "next/link"
import useSWR from 'swr'
import Head from "next/head"
import { parseISO, format } from 'date-fns'
import { motion } from 'framer-motion'

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
        <div className="inner-wrapper">
          {data && data.json.filter(p => p.published == true).map((post, index) => (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: .5, delay: index * .5 }}
              key={index}
            >
              <NextLink href="/[slug]" as={`/${post?.slug}`}>
                <a href={`/${post?.slug}`}>
                  <div className="card">
                    <div className="flex space-between">
                      <h2>{post?.title}</h2>
                      <p>{format(parseISO(post?.publishedAt), 'MMMM dd, yyyy')}</p>
                    </div>
                    <p>{post?.summary}</p>
                  </div>
                </a>
              </NextLink>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}