import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { DEFAULT_POSTS_PER_PAGE } from 'src/constants';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
  @Context() context,
  @Args('skip',{nullable:true}) skip?:number,
  @Args('take',{nullable:true}) take?:number,
  ) {
    const user = context.req.user;
    console.log(user);
    return this.postService.findAll({
      skip,
      take
    });
  }

  @Query(() => Int ,{name:'postsCount'})
  count() {
    return this.postService.count();
  }

}
