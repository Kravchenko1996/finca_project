import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth-service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../shared/interfaces/user';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {LoginResponse} from '../../shared/interfaces/http-responses';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        displayDefaultIndicatorType: false,
        showError: true
      }
    }
  ]
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup;
  emailConfirmation: FormGroup;
  errors: string[] = [];
  hide = true;
  isLinear = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.initRegisterForm();
    this.initEmailConfirmationForm();
  }

  initRegisterForm(): void {
    this.newUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  initEmailConfirmationForm(): void {
    this.emailConfirmation = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required]
    });
  }

  createUser(): void {
    if (this.newUserForm.valid) {
      const newUser = {
        ...this.newUserForm.value
      };
      this.auth.createUser(newUser)
        .subscribe((user: User) => {
            this.toastr.success(`Check ${user.email} to activate your account!`);
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

  confirmEmail(): void {
    this.auth.confirmEmail(
      {
        email: this.newUserForm.controls.email.value,
        code: this.emailConfirmation.controls.code.value
      }
    )
      .subscribe(response => {
        if (response) {
          this.toastr.success('Email successfully confirmed!');
          this.login();
        }
      }, error => {
        Object.values(error.error).forEach((err: string) => {
          this.errors.push(err);
        });
        this.errors.forEach(err => {
          this.toastr.warning(err);
        });
        this.errors = [];
      });
  }

  login(): void {
    if (this.newUserForm.valid) {
      this.auth.loginUser(this.newUserForm.value)
        .subscribe((response: LoginResponse) => {
          if (response) {
            this.toastr.success('Successfully logged in!');
            this.router.navigateByUrl('/');
          }
        }, error => {
          Object.values(error.error).forEach((err: string) => {
            this.errors.push(err);
          });
          this.errors.forEach(err => {
            this.toastr.warning(err);
          });
          this.errors = [];
        });
    }
  }
}
