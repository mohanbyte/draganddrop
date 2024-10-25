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
        // Calculate the raw movement
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        // Define grid size (adjust these values as needed)
        const GRID_SIZE = 20; // pixels

        // Calculate new position with boundaries
        let newTop =
          Math.min(
            Math.max(0, card.offsetTop),
            card.parentElement.offsetHeight - card.offsetHeight
          ) - newY;

        let newLeft =
          Math.min(
            Math.max(0, card.offsetLeft),
            card.parentElement.offsetWidth - card.offsetWidth
          ) - newX;

        // Snap to grid by rounding to nearest grid position
        newTop = Math.round(newTop / GRID_SIZE) * GRID_SIZE;
        newLeft = Math.round(newLeft / GRID_SIZE) * GRID_SIZE;

        // Apply the snapped position
        card.style.top = newTop + 'px';
        card.style.left = newLeft + 'px';
      }

      function mouseUp(e: MouseEvent) {
        document.removeEventListener('mousemove', mouseMove);
      }
    }
  }
  // Optional: Add helper function to snap a single value to grid
  snapToGrid(value: number, gridSize: number = 20): number {
    return Math.round(value / gridSize) * gridSize;
  }
}
