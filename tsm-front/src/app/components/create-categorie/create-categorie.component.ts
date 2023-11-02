import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Categorie } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie/categorie.service';

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.css']
})
export class CreateCategorieComponent implements OnInit {

  categorie_id:number
  categories:Categorie

  constructor(private route:Router, private categorieService:CategorieService) { }

  ngOnInit(): void {
    this.categories = new Categorie();
  }
  redirectToAllCategories(){
    this.route.navigate(['/categorie'])
  }

  createCategorie(): void {
    const formData = new FormData();
    formData.append('type', this.categories.type);
  
    this.categorieService.createCategorie(formData).subscribe(
      data => {
        console.log(data);
        this.categories = new Categorie();
        console.log(this.categories);
        this.redirectToAllCategories();
      },
      error => console.log(error)
    );
  }
  onSubmit(){
    this.createCategorie();
  }

}
