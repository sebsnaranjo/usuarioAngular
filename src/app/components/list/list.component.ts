import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/user.interface';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listUsers: UserData[] = [];

  displayedColumns: string[] = ['id', 'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido', 'fecha_nacimiento', 'sueldo', 'fecha_creacion', 'fecha_modificacion', 'Acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tasksService: TasksService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    } else {
      console.error('Paginator is still not defined after view init');
    }
  }

  getUsers(){
    this.tasksService.getUsers().subscribe( data => {
      this.listUsers = data;
      this.dataSource = new MatTableDataSource(this.listUsers)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  edit(element: any){
    const idUser = element.id;
    this.router.navigate(['/edit', idUser]);
  }

  delete(element: any){
    const idUser = element.id;
  
    this.tasksService.deleteUser(idUser).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El estudiante se ha eliminado correctamente.",
          icon: "success",
        }).then(() => {
          this.getUsers();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al eliminar el estudiante. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
