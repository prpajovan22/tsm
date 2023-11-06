import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Categorie } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie/categorie.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {

  id:number;
  categorieData:Categorie;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private categorieService:CategorieService) { }

  ngOnInit(): void {
    this.categorieData = new Categorie();

    this.id = this.route.snapshot.params['id'];

    this.categorieService.getCategorieById(this.id).subscribe(data =>{
      console.log(data)
      this.categorieData = data
    }, error=> console.log(error))
  }

  updateCategorie(){
    const formData = new FormData();
    formData.append("type",this.categorieData.type);
    this.categorieService.updateCategorie(this.id,formData).subscribe(data => {
      console.log(data);
      this.categorieData = new Categorie();
      this.redirectToAllCategories();
    }, error=> console.log(error))
  }
  onSubmit(){
    this.updateCategorie();
  }

  redirectToAllCategories(){
    this.router.navigate(['categorie'])
  }

}
