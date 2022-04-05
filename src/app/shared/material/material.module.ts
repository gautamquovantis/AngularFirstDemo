import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatSortModule,
  ],
  exports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatSortModule,
  ],
})
export class MaterialModule {}
