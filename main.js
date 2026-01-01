// shortcuts
const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

// Mobile menu
$("#menuBtn").onclick = () => {
  const links = $("#navLinks");
  links.style.display = links.style.display === "flex" ? "none" : "flex";
};

// Scroll to contact
function scrollToContact(){
  document.querySelector("#contact").scrollIntoView({behavior:"smooth"});
}

// Set year
$("#year").textContent = new Date().getFullYear();

// Counter animation
let countersStarted = false;
function animateCounters(){
  $$(".stat-num").forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 120;

    function update(){
      current += step;
      if(current < target){
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    update();
  });
}

window.addEventListener("scroll", () => {
  const stats = $(".stats");
  if(stats.getBoundingClientRect().top < window.innerHeight - 100 && !countersStarted){
    animateCounters();
    countersStarted = true;
  }
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-left h2", {opacity:0, y:30, duration:1});
gsap.from(".hero-left .lead", {opacity:0, y:20, duration:1});
gsap.from(".hero-card", {opacity:0, scale:0.95, duration:1});

gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger:{trigger:card,start:"top 85%"},
    opacity:0, y:40, duration:0.8, delay:i * 0.1
  });
});

// Contact form mock
function submitContact(e){
  e.preventDefault();
  alert("Message sent!");
  e.target.reset();
}
