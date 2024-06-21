import { Post, PostData, newPost } from '../../models/postFeed.ts'
import db from './connection.ts'

//getAllPosts
export async function getAllPosts() {
  const post = await db('feed_posts')
    .join('users', 'feed_posts.user_id', 'users.user_id')
    .join('profiles', 'users.user_id', 'profiles.user_id')
    .select(
      'feed_posts.feed_post_id',
      'feed_posts.user_id',
      'feed_posts.content',
      'feed_posts.timestamp',
      'feed_posts.image_url',
      'users.username',
      'profiles.avatar_image',
    )
  return post as Post[]
}

//addPost -AUTH to be included
export async function addPost(newPost: PostData) {
  const res = await db('feed_posts').insert(newPost)
}
//editPost -AUTH to be included
export async function editPost(updatedPost: newPost) {
  const { feed_post_id, user_id, content, timestamp, image_url } = updatedPost
  return db('feed_posts')
    .where({ feed_post_id })
    .update({ user_id, content, timestamp, image_url })
}

//deletPost -AUTH required
export async function deletePost(id: number) {
  return db('feed_posts').where('feed_post_id', id).delete()
}
//getPostById
export async function getPostById(id: number): Promise<Post> {
  const res = await db('feed_posts').where('feed_post_id', id).first()
  return res
}
