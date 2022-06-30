export interface TokenInfo {
    token: string
    user_display_name: string
}
export interface Post {
    id: number
    date: Date
    author: number
    title: string
    featured_media: number
    excerpt: string
    content: string
    status: string
    authorName: string
    imageLink: string
    viewOnWordpress: string
}
export interface Author {
    id: number,
    name: string
}