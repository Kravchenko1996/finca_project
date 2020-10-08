import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth-service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../shared/interfaces/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup;
  errors: string[] = [];
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  createNewAccount(): void {
    if (this.newUserForm.valid) {
      const newAccountData = {
        ...this.newUserForm.value
      };
      this.auth.createNewUserData(newAccountData)
        .subscribe((response: User) => {
            this.router.navigateByUrl('auth/email-confirm');
            this.toastr.success(`Check ${response.email} to activate your account!`);
          }, error => {
            Object.values(error.error).forEach((err: string) => {
              this.errors.push(err);
            });
            this.errors.forEach(err => {
              this.toastr.warning(err);
            });
            this.errors = [];
          }
        );
    }
  }
}
