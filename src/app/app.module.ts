import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HomeComponent } from './home/home.component';
import { FirstComponent } from './first/first.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'qr', component: FirstComponent },
  { path: 'photo', component: PhotoComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstComponent,
    PhotoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes
    ),
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
