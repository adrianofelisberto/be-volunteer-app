import { Injectable } from '@angular/core';

import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'platform'
})
export class MessageService {

  toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    width: 'auto',
  });

  confirmMessage(): Promise<SweetAlertResult> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn button-primary col-12 col-md-5 m-2',
        cancelButton: 'btn btn-danger  col-12 col-md-5 m-2'
      },
      buttonsStyling: false
    })
    
    return swalWithBootstrapButtons.fire({
      title: 'Tem certeza que quer excluir o voluntário?',
      text: "Não é possível desfazer a ação.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true
    });
  }

  successMessage(mensagem: string) {
    this.toast.fire({
      title: `<span style="color: #fff">${mensagem}</span>`,
      background: '#a1a633',
    });
  }

  errorMessage(mensagem: string) {
    this.toast.fire({
      title: `<span style="color: #fff">${mensagem}</span>`,
      background: 'rgba(207, 84, 84, 0.902)',
    });
  }

  warnningMessage(mensagem: string) {
    this.toast.fire({
      title: `<span style="color: #fff">${mensagem}</span>`,
      background: '#fe901a',
    });
  }

  inforMessage(mensagem: string) {
    this.toast.fire({
      title: `<span style="color: #fff">${mensagem}</span>`,
      background: '#65889E',
    });
  }

}
