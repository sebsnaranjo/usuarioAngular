import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/user.interface';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  form: FormGroup;
  userId!: number;

  constructor(private fb: FormBuilder, private tasksService: TasksService, private router: Router, private route: ActivatedRoute) {

    this.form = this.fb.group({
      id: [Validators.required],
      primer_nombre: [Validators.required],
      segundo_nombre: [''],
      primer_apellido: [Validators.required],
      segundo_apellido: [''],
      fecha_nacimiento: [Validators.required],
      sueldo: [Validators.required],
      fecha_creacion: [Validators.required],
      fecha_modificacion: [Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = + params['id'];
      this.tasksService
        .getUserID(this.userId)
        .subscribe((estudiante) => {
          this.form.patchValue(estudiante);
        });
    });
  }

  editUser() {

    const user: UserData = {
      id: this.userId,
      primer_nombre: this.form.value['primer_nombre'],
      segundo_nombre: this.form.value['segundo_nombre'],
      primer_apellido: this.form.value['primer_apellido'],
      segundo_apellido: this.form.value['segundo_apellido'],
      fecha_nacimiento: this.form.value['fecha_nacimiento'],
      sueldo: this.form.value['sueldo'],
      fecha_creacion: this.form.value['fecha_creacion'],
      fecha_modificacion: new Date()
    };
  
    this.tasksService.editUser(user, this.userId).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El usuario se ha editado correctamente.",
          icon: "success",
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al editar el usuario. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }

}
