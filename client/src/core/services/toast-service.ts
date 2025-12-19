import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  private createToastElement(messages: string, alertClass: string, duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
        <span>${messages}</span>
        <button class="btn btn-sm btn-ghost ml-4">✖</button>
    `
    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    })

    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(messages: string, duration?: number) {
    this.createToastElement(messages, 'alert-success', duration);
  }

  error(messages: string, duration?: number) {
    this.createToastElement(messages, 'alert-error', duration);
  }

  info(messages: string, duration?: number) {
    this.createToastElement(messages, 'alert-info', duration);
  }

  warning(messages: string, duration?: number) {
    this.createToastElement(messages, 'alert-warning', duration);
  }

}
