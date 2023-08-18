import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserImageService {
  private path = '/images';

  constructor(private http: HttpClient) {}

  uploadImage(userId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('file', file, file.name);

    return this.http.post(`${environment.api}${this.path}`, formData);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${environment.api}${this.path}/${id}`, { responseType: 'blob' });
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${environment.api}${this.path}/${id}`);
  }
}
