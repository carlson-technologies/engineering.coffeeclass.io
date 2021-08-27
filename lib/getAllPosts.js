// Fetch Notion table which has all blog posts using the Splitbee api.

export default async function getAllPosts() {
    return await fetch(
        `https://notion-api.splitbee.io/v1/table/a48c172559984e34bae5908461303eaf`
    ).then((res) => res.json())
}