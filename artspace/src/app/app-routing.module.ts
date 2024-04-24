import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { UserComponent } from './components/user/user.component';
import { FollowsComponent } from './components/follows/follows.component';
import {AlbumsComponent} from './components/albums/albums.component';
// import {AlbumDetailComponent} from './album-detail/album-detail.component';
import {AlbumPhotosComponent} from './components/album-photos/album-photos.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UploadPinComponent } from './components/upload-pin/upload-pin.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:id', component: CategoryDetailComponent},
  
  {path: 'about', component: AboutComponent},
  {path: 'add', component: UploadPinComponent},
  {path: ':id', component: UserComponent, children: [
    {path: 'follows', component: FollowsComponent },
    {path: 'albums', component: AlbumsComponent},
    // {path: 'albums/:id', component: AlbumDetailComponent},
    {path: 'albums/:id/photos', component: AlbumPhotosComponent},
    {path: 'settings', component: SettingsComponent }
  ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }