function PostList ( { posts } ) {
    return (
        <table>
            {posts.map( ( post ) => (
                <tr>
                    <td>{post.id}</td>
                    <td><a href={'/posts/post/' + post.id}>{post.title}</a></td>
                </tr>
            ) )}
        </table>
    )
}

// This function gets called at build time
export async function getStaticProps () {
    // Call an external API endpoint to get posts
    const res = await fetch( 'https://jsonplaceholder.typicode.com/posts' )
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    // const paths = posts.map( ( post ) => ( {
    //     params: { id: post.id },
    // } ) )

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
            // paths,
            // fallback: false
        },

    }
}


export default PostList