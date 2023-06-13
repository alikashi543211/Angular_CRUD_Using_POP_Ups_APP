import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular_CRUD_Using_POP_Ups_APP';
    addForm: FormGroup;
    submitted: boolean = false;
    constructor(private _toastr: ToastrService, private modalService: NgbModal) {

    }
    ngOnInit() {
        // this._toastr.success("Success Done", "Registration");
        // this._toastr.warning("Warning Done", "Registration");
        // this._toastr.error("Error Done", "Registration");
        // this._toastr.info("Info Done", "Registration");

        // Swal.fire({
        //     position: 'top-end',
        //     icon: 'success',
        //     title: 'Your work has been saved',
        //     showConfirmButton: false,
        //     timer: 1500
        // })

        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire(
        //             'Deleted!',
        //             'Your file has been deleted.',
        //             'success'
        //         )
        //     }
        // })
        this.setFormsState();

    }

    setFormsState() {
        this.addForm = new FormGroup({
            id: new FormControl(0),
            title: new FormControl('',  Validators.required),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            // dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|3[01])$/)])),
            dob: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirmPassword: new FormControl('', Validators.compose([Validators.required])),
            acceptTerms: new FormControl(false, Validators.compose([Validators.requiredTrue])),
        });
    }

    openXl(content) {
    	this.modalService.open(content, { size: 'xl' });
    }

    get ctrl() {
        return this.addForm.controls;
    }

    onEdit(userId) {
        alert("Edit Called " + userId);
    }

    onDelete(userId) {
        alert("Delete Called " + userId);
    }

    addUser() {
        this.submitted = true;
        console.log(this.addForm.value);
        console.log(this.addForm.valid);
    }

    onCancel() {
        this.addForm.reset();
    }
}
