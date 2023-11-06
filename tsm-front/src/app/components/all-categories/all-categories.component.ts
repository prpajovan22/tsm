import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  cat:Categorie[] = [];
  categorie : any;

  constructor(private catService:CategorieService,private route:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.catService.getCategories().subscribe(categories => {
      this.cat = categories;
    });
  }

  updateCategorie(id:number){
    this.route.navigate(['updateCategorie',id]);
  }

  deleteCategorie(id: number) {
    this.openConfirmationDialog(id);
  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed' && dialogRef.componentInstance.isConfirmed) {
        this.catService.deleteCategorie(id).subscribe(
          response => {
            console.log('Category deleted successfully:', response);
            window.location.reload();
          },
          error => {
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }
}
