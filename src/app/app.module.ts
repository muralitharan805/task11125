import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonMaterialModule } from './common-material/common-material.module';
import { GalleryComponent } from './gallery/gallery.component';
import { AccountUserDetailsComponent } from './account-user-details/account-user-details.component';
import { CardListComponent } from './card-list/card-list.component';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { spinnerInterceptor } from './spinner.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    AccountUserDetailsComponent,
    CardListComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonMaterialModule,
    NgOptimizedImage,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([spinnerInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
