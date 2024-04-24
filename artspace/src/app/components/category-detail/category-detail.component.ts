import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllPhoto } from '../../models'
import { CategoriesService } from '../../services/categories.service'


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  photos: AllPhoto[] = [];
  id: any;
  public list: Array<{[size: string]: string}> = [];

  constructor(private route: ActivatedRoute, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getPhotos()
    for (let i = 0; i < 15; i++) {
      this.list.push({size: 'small'});
      this.list.push({size: 'large'});
      this.list.push({size: 'medium'});
    }
  }

  getPhotos(){
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id');
      this.categoryService.getPhotos(+this.id).subscribe( (data) => {
        this.photos = data;
      });
    });
  }

}
