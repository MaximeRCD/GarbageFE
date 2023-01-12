import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

/* Data come from our database */
  name!: string;
  pseudo!: string;
  email!: string;
  newPassword!: string;


  profileForm = new FormGroup({
    name: new FormControl('Test'),
    pseudo: new FormControl('Test'),
    email: new FormControl('test@email.com'),
    newPassword: new FormControl('')
  });

  onSubmit() {
    console.log(this.profileForm.value)
    }
}
