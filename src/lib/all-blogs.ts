import { format } from 'date-fns'
import { asArray } from './as-array'
import { sortByDateDesc } from './sort-by-date'

export const getAllBlogs = (allPages: any) => {
  const blogFolder = allPages.find((item: any) => item.name === 'blog' && item.route === '/blog' && item.children)

  let blogs: any[] = []
  const getBlogs = (folder: any) => {
    if (folder.children) {
      folder.children.forEach((child: any) => {
        if (child.children) {
          getBlogs(child)
        }
        else {
          blogs.push(child)
        }
      })
    }
  }

  getBlogs(blogFolder)

  return blogs.map(blog => {
    const { title, description, tags, authors, image, date, updateDate, thumbnail }
      = blog.frontMatter
    const { route = '' } = blog

    return {
      title,
      description,
      tags: asArray(tags),
      authors: asArray(authors),
      link: route,
      image,
      date: format(new Date(date), 'y-MM-dd'),
      thumbnail,
      updateDate: updateDate ? format(new Date(updateDate), 'y-MM-dd') : null,
    }
  })
    .sort(sortByDateDesc)
}
