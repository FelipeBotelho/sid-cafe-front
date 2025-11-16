import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@sidcafe.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Se já estiver autenticado, redireciona para dashboard
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // Simulação de login - seguindo o modelo React
      const { email, password } = this.loginForm.value;
      
      setTimeout(() => {
        if (email === 'admin@sidcafe.com' && password === 'admin123') {
          // Login bem-sucedido
          console.log('Login realizado com sucesso');
          this.authService.login();
        } else {
          // Login falhou
          console.log('Credenciais inválidas');
          this.loginForm.setErrors({ invalidCredentials: true });
        }
        this.isLoading = false;
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getEmailErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email é obrigatório';
    }
    if (emailControl?.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }

  getPasswordErrorMessage() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Senha é obrigatória';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Senha deve ter pelo menos 6 caracteres';
    }
    return '';
  }
}