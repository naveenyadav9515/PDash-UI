import { Component, signal, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly greeting = signal('Hello, Naani');

  constructor() {
    afterNextRender(() => {
      const hour = new Date().getHours();
      if (hour < 12) {
        this.greeting.set('Good morning, Naani');
      } else if (hour < 17) {
        this.greeting.set('Good afternoon, Naani');
      } else {
        this.greeting.set('Good evening, Naani');
      }
    });
  }
}
