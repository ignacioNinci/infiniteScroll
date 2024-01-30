import { CommonModule } from "@angular/common"
import { TestBed } from "@angular/core/testing"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { DashboardComponent } from "./dashboard.component"
import { ServicesService } from "../../services/services.service"
import { HttpClientModule } from "@angular/common/http"

describe('DashboardComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientModule],
            providers: [ServicesService]
        }).compileComponents()
    })

    it('Should have a variable "characters" as "[]"', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const dashboard = fixture.componentInstance;
        expect(dashboard.characters).toEqual([])
    })
})