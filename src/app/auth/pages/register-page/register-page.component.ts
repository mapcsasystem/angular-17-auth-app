//#region Imports
import { Component, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/login-request';
//#endregion

//#region @Component
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
//#endregion
export class RegisterPageComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  public myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength]],
  });

  private _sub = new Subscription();

  summit() {}

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
