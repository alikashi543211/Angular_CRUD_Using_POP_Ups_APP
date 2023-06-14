import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class DataService implements InMemoryDbService {

    constructor() { }

    createDb() {
        let users: User[] = [
            { id: 100, title: 'Mr', firstName: 'Ajeet', lastName: 'Kumar', dob: '2005-07-13', email: 'ajeet@gmail.com', password: '123456', acceptTerms: true },
            { id: 101, title: 'Mr', firstName: 'Chandan', lastName: 'Singh', dob: '2001-08-06', email: 'chandan@gmail.com', password: '234234', acceptTerms: true },
            { id: 102, title: 'Mr', firstName: 'Pawan', lastName: 'Kumar', dob: '2012-01-10', email: 'pawan@gmail.com', password: '332312', acceptTerms: true },
            { id: 103, title: 'Mr', firstName: 'Sameer', lastName: 'Raj', dob: '2005-08-11', email: 'sameer@gmail.com', password: '346432', acceptTerms: true },
        ];
        return { users };
    }
}
