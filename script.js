let tl = gsap.timeline();
function locationScroll() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".container"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".container" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".container", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
});


 
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locationScroll()

function page2Animation() {
    gsap.from(".elem h1", {
        y:120,
        stagger:0.2,
        duration:1,
        scrollTrigger:{
            trigger:".container",
            scroller:"main",
            start:"top 47%",
            end:"top 46%", 
            scrub:2
        }
    })
}
page2Animation()
tl.from(".logo", { y: -20, duration: 1, opacity: 0 });
tl.from(".h3", { y: -20, duration: 1, opacity: 0 , stagger: 0.5});
gsap.from(".right-child h3", {
    opacity:0,
    stagger: 0.3,
    delay:0,
    duration: 2,
})
gsap.from(".profile", { scale:0, duration: 1, opacity: 0 , stagger: 0.5});
gsap.from(".right", {
     opacity:0,
    duration:2,
    x:-200
});
let bars = gsap.timeline()
bars.to(".html-bar-fill", {width: "92%", duration: 4})
bars.to(".css-bar-fill", {width: "90%", duration: 4})
bars.to(".js-bar-fill", {width: "80%", duration: 4})
bars.to(".cssa-bar-fill", {width: "60%", duration: 4})


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if(entry.isIntersecting){
          entry.target.classList.add("show")
      }else{
          entry.target.classList.remove("show")
      }
    });
  });
  
  const hiddenElements = document.querySelectorAll(".hidden");
  
  hiddenElements.forEach((el) => observer.observe(el))


  function scroll(){
    window.scrollTo({bottom: 100, behavior: 'smooth'});
  }