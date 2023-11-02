import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie/categorie.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  cat:Categorie[] = [];
  categorie : any;

  constructor(private catService:CategorieService,private route:Router) { }

  ngOnInit(): void {
    this.catService.getCategories().subscribe(categories => {
      this.cat = categories;
    });
  }

}
