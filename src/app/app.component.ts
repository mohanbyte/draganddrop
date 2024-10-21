import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'draganddrop';
  ngOnInit() {
    let newX = 0,
      newY = 0,
      startX = 0,
      startY = 0;

    const card: any = document.getElementById('card');

    card.addEventListener('mousedown', mouseDown);

    function mouseDown(e: MouseEvent) {
      startX = e.clientX;
      startY = e.clientY;

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    }

    function mouseMove(e: MouseEvent) {
      newX = startX - e.clientX;
      newY = startY - e.clientY;

      startX = e.clientX;
      startY = e.clientY;

      card.style.top = Math.max(0, card.offsetTop) - newY + 'px';
      card.style.left =
        Math.min(
          Math.max(0, card.offsetLeft),
          card.parentElement.offsetWidth - card.offsetWidth
        ) -
        newX +
        'px';

      console.log(card.offsetTop, card.offsetRight);
    }

    function mouseUp(e: MouseEvent) {
      document.removeEventListener('mousemove', mouseMove);
    }
  }
}
