import { CommonModule } from '@angular/common';
import { Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { MatTableModule } from '@angular/material/table';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { response } from 'express';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { resolve } from 'node:path';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, InfiniteScrollModule, MatSortModule, MatCheckboxModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ServicesService]
})
export class DashboardComponent implements OnInit {

  private apiService = inject(ServicesService);

  characters: any[] = [];
  displayedColumns?: string[];
  nextUrl: string = ''
  clickedRows = new Set<any>();
  


  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters(): void {
    this.apiService.getCharacters().subscribe({
      next: (response) => {
        // console.log(response);
        const keys = Object.keys(response?.results[0]);
        this.displayedColumns = ['select', ...keys]
        this.characters = response.results;
        console.log(response)
        this.nextUrl = response.info.next
      }
    });
  }

  onScroll() {

    this.apiService.getCharacters(this.nextUrl).subscribe({
      next: res => {
        console.log(res.info.next)
        if (res.info.next && res.info.next !== null) {
          this.nextUrl = res.info.next
            this.characters = [...this.characters, ...res.results]
        }
      }
    })
  }

  onScrollUp() {
    alert('LLegaste al inicio')
  }


  
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.characters.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log(this.selection.selected)
    this.isAllSelected() ?
        this.selection.clear() :
        this.characters.forEach(row => this.selection.select(row));
  }

  toggle(row: any) {
    console.log(row.source?.value)
  }

 
  
}
