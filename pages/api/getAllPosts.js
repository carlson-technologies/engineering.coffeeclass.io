// Fetch Notion table which has all blog posts using the Splitbee api.
export default async (_, res) => {
    const response = await fetch(`https://notion-api.splitbee.io/v1/table/a48c172559984e34bae5908461303eaf`)
    const json = await response.json()

    return res.status(200).json({
        json: json
    })
}