import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'draganddrop';
  cards = [1, 2];
  ngAfterViewInit() {
    for (let element of this.cards) {
      let newX = 0,
        newY = 0,
        startX = 0,
        startY = 0;
      console.log(element);
      const card: any = document.getElementById('card-' + element);

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

        card.style.top =
          Math.min(
            Math.max(0, card.offsetTop),
            card.parentElement.offsetHeight - card.offsetHeight
          ) -
          newY +
          'px';
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
}
