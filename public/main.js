(function() {
    "use strict";
  
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
   
    const on = (type, el, listener, all = false) => {
      if (all) {
        select(el, all).forEach(e => e.addEventListener(type, listener))
      } else {
        select(el, all).addEventListener(type, listener)
      }
    }
  
  
    /**
     * on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
  
    
      
  
    on('click', '.scrollto', function(e) {
      select('li.active').removeClass("active");
      this.addClass('active');
      
    })
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      if (!header.classList.contains('header-scrolled')) {
        offset -= 10
      }
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    let selectNav = select('.navbar')
    // let selectNav2 = select('.navbar2')
    let section2 = select(".two").offsetTop-200 
    let section3 = select(".three").offsetTop-100 
    let selecti = select(".mobile-nav-toggle")
  
    console.log(section3)
  
    if (selectNav) {
      
      const scrolled = () => {
        if (window.scrollY >  section2) {
         
          if (selectNav.classList.contains('navbar-mobile')) {
  
            selectNav.classList.add( 'nav-scrolled','navbar-mobile-scrolled');
           
            
          }
          else{
            selectNav.classList.add( 'nav-scrolled');
          }
          
         
          // selectNav2.classList.add('nav-scrolled');
          
        }
        else {
          selectNav.classList.remove('nav-scrolled', 'navbar-mobile-scrolled');
          
          
        }
      }
      window.addEventListener('load',scrolled)
      onscroll(document, scrolled)
    }
  
    
  
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */

    
    on('click', '.mobile-nav-toggle', function(e) {
        console.log("here")
      
      select('#navbar').classList.toggle('navbar-mobile')
      
      this.classList.toggle('fa-bars')
      this.classList.toggle('fa-times')
    })

   
    
  
    /**
     * Mobile nav dropdowns activate selectNav2.classList.add('nav-scrolled')
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scroll with offset on links with a class name .scrollto
     * 
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('fa-bars')
          console.log("here")
          navbarToggle.classList.toggle('fa-times')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
   
    
    /**
     * Animation on scroll
     */
    function aos_init() {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
    
    window.addEventListener('load', () => {
      aos_init();
    });
  
    // coin animation
  
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    let activeSlide = 0;
    
    slider.addEventListener('animationstart', () => {
    setInterval(changeSlide, 2000);
    });
    
    function changeSlide() {
    slides[activeSlide].classList.remove('visible');
    
    activeSlide++;
    
    if(activeSlide >= slides.length) {
    activeSlide = 0;
    }
    
    slides[activeSlide].classList.add('visible');
    }
  
    
  
  })();