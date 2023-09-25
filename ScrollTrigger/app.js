gsap.registerPlugin(ScrollTrigger);

gsap.to(".square",{
    // x: 1000,
    duration: 8,
    scrollTrigger: {
        trigger: ".square2",
        start: "top 60%",
        // end: () => `+=${document.querySelector(".square").offsetHeight}`,
        end: "top 40%",
        scrub: 4,
        toggleActions: "restart none none none", 
        // pin: true,
        pin: ".square",
        pinSpacing: true,
        // play pause resume reverse restart reset complete none
        //              OnEnter onLeave  onEnterBack onLeaveBack
        markers: true,
        // toggleClass: "red"
    }
})