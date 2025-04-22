export const slideInOut = async () => {
  console.log("slideInOut function called (Original Logic)");
  if (!document.startViewTransition) {
    console.log("slideInOut: View Transitions not supported, exiting.");
    return; // Skip if View Transitions are not supported
  }

  console.log("slideInOut: Applying original animation...");
  const duration = 600; // Duration from guide
  const easing = 'cubic-bezier(0.4, 0, 0.2, 1)'; // Easing from guide

  // Animate OLD root: Fade out and move up
  document.documentElement.animate(
    {
      transform: ['translateY(0)', 'translateY(-35px)'],
      opacity: [1, 0.2],
    },
    {
      duration: duration,
      easing: easing,
      pseudoElement: '::view-transition-old(root)',
    }
  );

  // Animate NEW root: Reveal via clip-path from bottom
  document.documentElement.animate(
    {
      clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
    },
    {
      duration: duration,
      easing: easing,
      pseudoElement: '::view-transition-new(root)',
    }
  );
}; 