import { Component, OnInit } from '@angular/core';
import { Category } from '../../models'
import { CategoriesService } from '../../services/categories.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  isLoading = true;

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.isLoading = false;
    });
  }



}
