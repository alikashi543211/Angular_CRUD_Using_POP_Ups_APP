import { User } from './helpers/user.interface';
import { UserApiService } from './helpers/user-api.service';
import { Action } from './helpers/action.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './helpers/must-match.validator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular_CRUD_Using_POP_Ups_APP';
    addForm: FormGroup;
    submitted: boolean = false;
    @ViewChild('content') elContent: any;
    modalRef: any;
    buttonText: string = "";
    dbops: Action;
    formTitle: string;
    userData: User[];

    constructor(private _toastr: ToastrService, private modalService: NgbModal, private _userApi: UserApiService) {

    }
    ngOnInit() {
        this.setFormsState();
        this.getAllUsers();
    }

    setFormsState() {

        this.addForm = new FormGroup({
            id: new FormControl(0),
            title: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            // dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|3[01])$/)])),
            dob: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirmPassword: new FormControl('', Validators.compose([Validators.required])),
            acceptTerms: new FormControl(false, Validators.compose([Validators.requiredTrue])),
        },
            MustMatch('password', 'confirmPassword'),
        );
    }

    getAllUsers() {
        this._userApi.getUsers().subscribe((res: User[]) => {
            this.userData = res;
        });
    }

    openXl(content) {
        this.buttonText = "Save";
        this.formTitle = "Add User";
        this.dbops = Action.create;

        this.modalRef = this.modalService.open(content, { size: 'xl' });
    }

    get ctrl() {
        return this.addForm.controls;
    }

    onEdit(userId) {
        this.buttonText = 'Update';
        this.formTitle = 'Update User';
        this.dbops = Action.update;
        // Fetch data from existing data without API Call
        let user = this.userData.find((u: User) => u.id == userId);
        this.addForm.patchValue(user);
        // Set Default Values For Password and Accept Terms
        this.addForm.controls['password'].setValue('');
        this.addForm.controls['confirmPassword'].setValue('');
        this.addForm.controls['acceptTerms'].setValue(false);
        // Open Ng Bootstrap Modal
        this.modalRef = this.modalService.open(this.elContent, { size: 'xl' });
    }

    onDelete(userId: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, keep it!',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this._userApi.deleteUser(userId).subscribe(res => {
                    this.getAllUsers();
                    this._toastr.success('User Deleted !!', 'User Registration');
                })
            }
        })
    }

    addUser() {
        this.submitted = true;

        if (this.addForm.invalid) {
            return;
        }

        switch (this.dbops) {
            case Action.create:
                // Code Here to Save data in database
                this._userApi.addUser(this.addForm.value).subscribe(res => {
                    // Call Get all users after save a new user
                    this.getAllUsers();
                    this._toastr.success("User Added !!", "User Registration");
                    this.onCancel();
                })
                break;
            case Action.update:
                // Code Here to Update data in database
                this._userApi.updateUser(this.addForm.value).subscribe(res => {
                    // Call Get all users after update a user
                    this.getAllUsers();
                    // Message User updated successfully
                    this._toastr.success("User Updated !!", "User Registration");
                    // On cancel reset form and close modal
                    this.onCancel();
                })

                break;
        }
    }

    onCancel() {
        this.buttonText = "Save";
        this.formTitle = "Add User";
        this.dbops = Action.create;
        this.submitted = false;

        this.addForm.reset({
            id: 0,
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        });

        this.modalRef.close();
    }
}
