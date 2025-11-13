import { format } from 'date-fns'
import { asArray } from './as-array'
import { sortByDateDesc } from './sort-by-date'

export const getAllBlogs = (allPages: any) => {
  const blogFolder = allPages.find(item => item.name === 'blog' && item.route === '/blog' && item.children)

  let blogs = []
  const getBlogs = (folder) => {
    if (folder.children) {
      folder.children.forEach(child => {
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

    // if (title.length > 70) {
    //   throw new Error(
    //     `SEO issue: The title "${title}" is too long, should be less than 70 characters - route ${route}`,
    //   );
    // }

    // if (title.length < 20) {
    //   throw new Error(
    //     `SEO issue: The title "${title}" is too short, should be more than 20 characters - route ${route}`,
    //   );
    // }

    // if (description.length > 160) {
    //   throw new Error(
    //     `SEO issue: The description "${description}" is too long, should be less than 160 characters, not ${description.length}, route "${route}"`,
    //   );
    // }

    // if (description.length < 50) {
    //   throw new Error(
    //     `SEO issue: The description "${description}" is too short, should be more than 50 characters, not ${description.length}, route "${route}"`,
    //   );
    // }

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
