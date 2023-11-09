import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import morph from '@alpinejs/morph'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'

// Global get CSRF token function (used by forms).
window.getToken = async () => {
    return await fetch('/!/statamic-peak-tools/dynamic-token/refresh')
        .then((res) => res.json())
        .then((data) => {
            return data.csrf_token
        })
        .catch((error) => {
            this.error = 'Something went wrong. Please try again later.'
        })
}

document.addEventListener("DOMContentLoaded", function() {
  const magneticElements = document.querySelectorAll(".magnetic");

  magneticElements.forEach(element => {
      element.addEventListener("mousemove", function(event) {
          if (window.innerWidth > 540) {
              const rect = element.getBoundingClientRect();
              const strength = element.getAttribute("data-strength") || 20; // Default strength if not set
              const x = ((event.clientX - rect.left) / element.offsetWidth - 0.5) * strength;
              const y = ((event.clientY - rect.top) / element.offsetHeight - 0.5) * strength;

              element.style.transform = `translate(${x}px, ${y}px)`;
          }
      });

      element.addEventListener("mouseleave", function() {
          element.style.transform = `translate(0px, 0px)`;
      });
  });
});

// Call Alpine.
window.Alpine = Alpine
Alpine.plugin([collapse, focus, morph, persist])
// Define your marquee component here
window.marquee = function () {
    return {
      init() {
        this.startMarquee();
      },
      startMarquee() {
        const marqueeElement = this.$refs.marquee;
        let marqueeWidth = marqueeElement.scrollWidth / 2; // Assume the content is duplicated, so we use half the width
        let x = 0;
  
        const marquee = () => {
          x -= 0.6; // Adjust speed by changing the value here
          if (Math.abs(x) >= marqueeWidth) {
            x = 0; // Reset x to 0 instead of marqueeWidth to loop back to the start
          }
          marqueeElement.style.transform = `translateX(${x}px)`;
        };
  
        // Start the marquee
        setInterval(marquee, 10); // Adjust interval for speed
      }
    };
  };
  
  Alpine.start();
  