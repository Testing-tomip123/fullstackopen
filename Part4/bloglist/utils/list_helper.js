const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return -1
    }

    let maxLikes = 0, position = 0
    for(let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > maxLikes) {
            maxLikes = blogs[i].likes
            position = i
        }
    }
    return blogs[position]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return { author: '', blogs: 0 }
    }

    let authors = []
    for(let i = 0; i < blogs.length; i++) {
        if (authors.indexOf(blogs[i].author) === -1) {
            authors.push(blogs[i].author)
        }
    }

    let maxBlogs = 0, position = 0
    for(let i = 0; i < authors.length; i++) {
        let count = 0
        for(let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === authors[i]) {
                count++
            }
        }
        if (count > maxBlogs) {
            maxBlogs = count
            position = i
        }
    }
    return { author: authors[position], blogs: maxBlogs }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return { author: '', likes: 0 }
    }
    
    let authors = []
    for(let i = 0; i < blogs.length; i++) {
        if (authors.indexOf(blogs[i].author) === -1) {
            authors.push(blogs[i].author)
        }
    }

    let maxLikes = 0, position = 0
    for(let i = 0; i < authors.length; i++) {
        let count = 0
        for(let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === authors[i]) {
                count += blogs[j].likes
            }
        }
        if (count > maxLikes) {
            maxLikes = count
            position = i
        }
    }
    return { author: authors[position], likes: maxLikes }
}

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog, 
    mostBlogs, 
    mostLikes
}