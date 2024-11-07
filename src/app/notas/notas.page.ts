import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {
  notas: any[] = [];

  constructor(private apiService: ApiService, private alertController: AlertController) {}

  ngOnInit() {
    this.loadNotas();
  }

  loadNotas() {
    this.apiService.getPosts().subscribe((data: any[]) => {
      this.notas = data;
    });
  }

  async addNota() {
    const alert = await this.alertController.create({
      header: 'Añadir Nota',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título de la Nota',
        },
        {
          name: 'body',
          type: 'textarea',
          placeholder: 'Contenido de la Nota',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.apiService.addPost(data).subscribe((newNota) => {
              this.notas.push(newNota);
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async editNota(nota: any) {
    const alert = await this.alertController.create({
      header: 'Editar Nota',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: nota.title,
          placeholder: 'Título de la Nota',
        },
        {
          name: 'body',
          type: 'textarea',
          value: nota.body,
          placeholder: 'Contenido de la Nota',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const updatedNota = { ...nota, ...data };
            this.apiService.updatePost(updatedNota.id, updatedNota).subscribe(() => {
              const index = this.notas.findIndex((n) => n.id === nota.id);
              if (index > -1) {
                this.notas[index] = updatedNota;
              }
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Nota',
      message: '¿Estás seguro de que deseas eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteNota(id);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteNota(id: number) {
    this.apiService.deletePost(id).subscribe(() => {
      this.notas = this.notas.filter((nota) => nota.id !== id);
    });
  }
}
