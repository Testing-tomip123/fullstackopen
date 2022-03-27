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

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog
}