import { Component, signal, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly userName = 'Naani';
  protected readonly greeting = signal('Hello');

  constructor() {
    afterNextRender(() => {
      const hour = new Date().getHours();
      if (hour < 12) {
        this.greeting.set('Good morning');
      } else if (hour < 17) {
        this.greeting.set('Good afternoon');
      } else {
        this.greeting.set('Good evening');
      }
    });
  }
}
