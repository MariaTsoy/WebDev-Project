import { Component, OnInit, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AlbumsService} from '../../albums.service';
import {Album, Photo} from '../../models';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos!: Photo[];
  thisPhoto!: Photo;
  thisAlbum!: Album;
  photo!: Photo;
  id!: number;
  modalRef!: BsModalRef;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private albumsService: AlbumsService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPhotos();
  }
  getPhotos(): void {
    // @ts-ignore
    this.route.paramMap.subscribe((x) => this.id = +x.get('id'));
    this.albumsService.getPhotos(this.id).subscribe((photos) => {
      this.photos = photos;
    });
  }
  getPhoto(photoID: number): void{
    // @ts-ignore
    // this.route.paramMap.subscribe((x) => this.id = +x.get('id'));
    this.albumsService.getPhoto(this.id, photoID).subscribe((photo) => {
      // @ts-ignore
      this.thisPhoto = photo;
    });
  }
  public openModal(template: TemplateRef<any>, photoId: number): void{
    this.getPhoto(photoId);
    this.modalRef = this.modalService.show(template);
  }
  public openModal1(template: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(template);
  }
}
