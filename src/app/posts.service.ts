import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-http-a25f7-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData,
        {}
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
          console.log(error);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();

    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('Custom', 'Key');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-http-a25f7-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({
            'Custom-header': 'testing headers',
          }),
          params: searchParams,
          // params: new HttpParams().set('print', 'pretty'),
        }
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
        }),
        catchError((errorRes) => {
          return throwError(errorRes.message);
        })
      );
  }

  deleteAllPosts() {
    return this.http.delete(
      'https://ng-http-a25f7-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    );
  }
}
