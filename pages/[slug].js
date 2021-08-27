import { NotionRenderer } from "react-notion"
import getAllPosts from "../lib/getAllPosts"
import { FiChevronLeft } from "react-icons/fi"
import NextLink from "next/link"
import { motion } from 'framer-motion'
import { parseISO, format } from 'date-fns'
import Head from "next/head"
import Footer from "../components/Footer"

export default function Post({ post, blocks }) {
  return (
    <>
      <Head>
        <title>{post?.title} - coffeeclass.io Engineering</title>
        <meta name="description" content={post?.summary}></meta>
      </Head>
      <div className="wrapper">
        <div className="header-wrapper">
          <NextLink href="/">
            Home
          </NextLink>
          <h1 style={{ fontSize: '3em', marginBottom: '8px' }}>{post?.title && post.title}</h1>
          <p>Posted on {post?.data && format(parseISO(post.date), 'MMMM dd, yyyy')}</p>
        </div>
        <div className="inner-wrapper">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .5 }}
          >
            {blocks && <NotionRenderer blockMap={blocks} />}
          </motion.div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  // Grab all posts
  const posts = await getAllPosts()

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug)

  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then((res) => res.json())

  return {
    props: {
      blocks,
      post,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map((row) => `/${row.slug}`),
    fallback: true,
  }
}