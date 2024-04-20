import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private tasksService: TasksService, private router: Router) {

    const currentDate = new Date().toISOString();

    this.form = this.fb.group({
      primer_nombre: ['Frank', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['Naranjo', Validators.required],
      segundo_apellido: [''],
      fecha_nacimiento: [Validators.required],
      sueldo: [20000, Validators.required],
      fecha_creacion: [currentDate, Validators.required],
      fecha_modificacion: [currentDate, Validators.required]
    })
  }

  addUser(){
    this.tasksService.createUser(this.form.value).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El usuario se ha creado correctamente.",
          icon: "success",
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }

}
