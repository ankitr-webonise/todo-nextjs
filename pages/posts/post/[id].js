
function DynamicPost ( { post } ) {
    return (
        <>
            <a href="/posts/post-list">Back</a>
            <ul>
                <li>{post.title}</li>
            </ul>
        </>

    )
}

// This also gets called at build time
export async function getServerSideProps ( { params } ) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch( `https://jsonplaceholder.typicode.com/posts/${ params.id }` )
    const post = await res.json()

    // Pass post data to the page via props
    return { props: { post } }
}

export default DynamicPost