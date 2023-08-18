import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string | null = null;
  private errorSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private postsService: PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postsService.error.subscribe((err) => {
      this.error = err;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (err) => {
        this.error = err.message;
        console.log('err', err);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deleteAllPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleEror() {
    this.error = null;
    this.isFetching = false;
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }
}
