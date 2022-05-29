// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.name
            return seen.has(k) ? false : seen.add(k)
        })
    }
    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByName(allBooks.concat(addedPerson)),
        }
    })
}
