import { transition, style, animate, trigger } from "@angular/animations";

const enterTransition = transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('0.5s ease', style({
      opacity: 1,
    }))
  ])
  
export  const fadeIn = trigger('fadeIn', [enterTransition]);
  
  const exitTransition = transition(':leave', [
    style({
      opacity: 1,
    }),
    animate('0.5s ease-out', style({
      opacity: 0,
    }))
  ])

export const fadeOut = trigger('fadeOut', [exitTransition]);
