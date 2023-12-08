//#region Imports
import { Component, OnDestroy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/login-request';

import Swal from 'sweetalert2';
//#endregion

//#region @Component
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
//#endregion
export class LoginPageComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  private _sub = new Subscription();

  summit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value as LoginRequest;
    this._sub.add(
      this.authService.login(email, password).subscribe({
        next: (value) => {
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        },
        error: (errorMessage) => {
          if (errorMessage === 401) {
            Swal.fire({
              title: 'Error',
              text: 'El correo ó contraseña son incorrectos',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
