import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'Angular_CRUD_Using_POP_Ups_APP';
    constructor(private _toastr: ToastrService) {

    }
    ngOnInit() {
        this._toastr.success("Success", "Registration");

    }
}
