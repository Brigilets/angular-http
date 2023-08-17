import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-http-a25f7-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-http-a25f7-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({
                ...responseData[key as keyof Object],
                id: key,
              });
            }
          }
          return postsArray;
        })
      );
  }

  deleteAllPosts() {
   return this.http
      .delete(
        'https://ng-http-a25f7-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
     
  }
}
