import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
interface IDogImageResponse {
  message: string;
  status: string;
}
@Component({
  selector: 'app-gallery',
  standalone: false,

  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private dogImagesSubject = new BehaviorSubject<IDogImageResponse[]>([]);
  dogImages$ = this.dogImagesSubject.asObservable();
  private apiUrl = 'https://dog.ceo/api/breeds/image/random';
  constructor(private httpClient: HttpClient) {}

  fetchRandomDogImage(): Observable<IDogImageResponse> {
    return this.httpClient
      .get<any>(this.apiUrl)
      .pipe(map((response) => response as IDogImageResponse));
  }

  ngOnInit(): void {
    this.loadDogImages();
  }

  loadDogImages(): void {
    const apiCalls = Array(10)
      .fill(null)
      .map(() => this.fetchRandomDogImage());

    forkJoin(apiCalls).subscribe((responses) => {
      // this.dogImages = responses;
      this.dogImagesSubject.next(responses);
    });
  }
}
