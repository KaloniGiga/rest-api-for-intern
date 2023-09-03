import Post from 'src/models/post.model';
import { createPostParams } from 'src/types/createPost.interface';

export class PostService {
  async createPost(createPostDetails: createPostParams) {
    const newPost = new Post({
      title: createPostDetails.title,
      content: createPostDetails.content,
      userId: createPostDetails.userId,
    } as Post);

    await newPost.save();
    return newPost;
  }

  async getPostById(id: number) {
    const post = await Post.findOne({ where: { id: id } });
    return post;
  }
}

export const postService = new PostService();
