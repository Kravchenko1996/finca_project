import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth-service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {
  emailConfirmation: FormGroup;
  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.emailConfirmation = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required]
    });
  }

  confirmEmail(): void {
    if (this.emailConfirmation.valid) {
      const emailConfirmationData = {
        ...this.emailConfirmation.value
      };
      this.auth.confirmEmail(emailConfirmationData)
        .subscribe(response => {
          if (response) {
            this.toastr.success('Email successfully confirmed!');
            this.router.navigateByUrl('/');
          }
          // ToDo wrong email code
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
