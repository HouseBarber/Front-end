import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserImageService {

  private url = `${environment.api}/images`;
  constructor(private http: HttpClient) {}

  uploadImage(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('file', file);
    return this.http.post(this.url, formData);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(this.url + `/user/${id}`, { responseType: 'blob' });
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`this.url/${id}`);
  }
}
