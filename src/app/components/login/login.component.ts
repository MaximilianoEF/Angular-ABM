import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({ //Le digo que el formulario es de tipo group
      usuario: ['', Validators.required], //Declaro que va a tener el campo 'usuario' inicializado en '' y que ese campo es requerido
      contraseña: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    const usuario = this.form.value.usuario;
    const contraseña = this.form.value.contraseña;
    if(usuario === 'ADMIN' && contraseña === 'bnm123'){
      //Redireccionamos al dashboard
      this.fakeLoading();
    } else {
      this.error();
      this.form.reset();
      //Mostramos un mensaje de error
    }
  }

  error() {
    this._snackBar.open('Usuario o contraseña ingresado es invalido', 'Aceptar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
      //Redireccionamos al dashboard
    }, 1500)
  }

}
