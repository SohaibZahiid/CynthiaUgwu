const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout

function circleSqueeze() {
  let xprev = 0, yprev = 0

  window.addEventListener("mousemove", e => {

    clearTimeout(timeout)

    const xscale = gsap.utils.clamp(.8, 1.2, e.clientX - xprev)
    const yscale = gsap.utils.clamp(.8, 1.2, e.clientY - yprev)

    xprev = e.clientX
    yprev = e.clientY

    circleMouseFollower(xscale, yscale)
    timeout = setTimeout(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px) scale(1, 1)`;
    }, 100)
  })
}

function firstPageAnim() {
  const tl = gsap.timeline()
  tl.from("nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  }).to(".boundingelem", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
    stagger: .2,
    delay: -1
  }).from(".herofooter", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut
  })
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", (e) => {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px) scale(${xscale}, ${yscale})`;
  });
}

circleSqueeze()
firstPageAnim()
circleMouseFollower();

document.querySelectorAll('.song').forEach(el => {

  let rotate = 0;
  let diffrot = 0;


  el.addEventListener('mouseleave', e => {
    gsap.to(el.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: .5
    })
  })

  el.addEventListener('mousemove', e => {

    const diff = e.clientY - el.getBoundingClientRect().top
    diffrot = e.clientX - rotate
    rotate = e.clientX

    gsap.to(el.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: e.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * .6)
    })
  })
  
})
