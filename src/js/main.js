document.addEventListener("DOMContentLoaded", function () {
   let bodyEl = document.body;
    /*open mobile menu */
    const menuButton = document.querySelector('#menu-toggle');
    const mobileMenu = document.querySelector('#header-menu');
    
    menuButton.addEventListener('click', ()=> {
      
      if( menuButton.classList.contains('active')){
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        bodyEl.classList.remove('lock');
        
      }else{
        menuButton.classList.add('active');
        mobileMenu.classList.add('active');
        bodyEl.classList.add('lock');
      }
    });

   //CASES SLIDER
   const casesSlider = new Swiper('.cases-swiper',{
     spaceBetween: 10,
    navigation: {
        nextEl: ".cases-button-next",
        prevEl: ".cases-button-prev",
      },
     breakpoints: {
        768: {
          spaceBetween: 20,
        },
        
      }
   });
  
   //review-swiper
   const reviewSlider = new Swiper('.review-swiper',{
    slidesPerView:'auto',
    pagination: {
        el: ".review-pagination",
        clickable: true,
      },
    navigation: {
        nextEl: ".review-button-next",
        prevEl: ".review-button-prev",
      },
       breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768:{
          slidesPerView: 2,
          // spaceBetween:20,
        }
      }
   });
   //CLIENTS SWIPER
   const clientsSwiper = new Swiper('.clients-swiper', {
      slidesPerView: 'auto',
      loop: true,
      speed: 5000,
      allowTouchMove: false,
      autoplay: {
        delay: -1,
        disableOnInteraction: false,
      },
      freeMode: true,
      freeModeMomentum: false,
       breakpoints: {
        1200:{
          slidesPerView:5,
        },
      1920:{
          slidesPerView:6,
        }
      },
    });

   //STICKY HEADER
   const header = document.querySelector("#header");
   
    if (header) {
      let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

      window.addEventListener("scroll", () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        const isScrollingUp = currentScrollTop < lastScrollTop;

        if (isScrollingUp && !header.classList.contains("fix-header")) {
          header.classList.add("fix-header");
          
        }

        if (!isScrollingUp && header.classList.contains("fix-header")) {
          header.classList.remove("fix-header");
         
        }

        lastScrollTop = currentScrollTop;
      });

      // 🔒 Блокируем удаление .fix-header при resize
      window.addEventListener("resize", () => {
        // Ничего не делаем с .fix-header!
        // Просто можно обновить layout или вызвать перерисовку, если нужно
      });
    }
   
});

 // TABS
document.addEventListener("DOMContentLoaded", function () {
  let activeSwiper = null; // Храним активный Swiper

  function initSwiper(container) {
      return new Swiper(container, {
          slidesPerView: 'auto',
          spaceBetween:10,
          speed: 800,
          navigation: {
              nextEl: ".mySwiper-next",
              prevEl: ".mySwiper-prev",
          },
           breakpoints: {
            768:{
              slidesPerView:3,
              spaceBetween:10,
            },
            1200:{
              slidesPerView:3,
              spaceBetween:18,
            },
          }
      });
  }

  function activateTab(tabButton) {
      const tabValue = tabButton.getAttribute("data-tbat");

      document.querySelectorAll(".tabs__nav-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".tabs-content").forEach(tab => tab.classList.remove("active"));

      
      tabButton.classList.add("active");
      const activeTab = document.querySelector(`.tabs-content[data-tcontent="${tabValue}"]`);
      if (activeTab) {
          activeTab.classList.add("active");

         
          setTimeout(() => {
              const swiperContainer = activeTab.querySelector(".mySwiper");
              if (swiperContainer) {
                  if (activeSwiper) activeSwiper.destroy(true, true); // Удаляем старый Swiper
                  activeSwiper = initSwiper(swiperContainer); // Запускаем новый Swiper
              }
          }, 50);
      }
  }

 
  document.querySelectorAll(".tabs__nav-btn").forEach(btn => {
      btn.addEventListener("click", () => activateTab(btn));
  });

  
  const firstActiveTab = document.querySelector(".tabs__nav-btn.active") || document.querySelector(".tabs__nav-btn");
  if (firstActiveTab) activateTab(firstActiveTab);
});

document.addEventListener('DOMContentLoaded', function() {
  
  const acordions = document.querySelectorAll('.acordion');
  if(acordions.length >0){
    acordions.forEach((acor)=>{
      const acorGroups = acor.querySelectorAll('.acordion-group');
        acorGroups.forEach((gr)=>{
          acorItemHeader = gr.querySelector('.acordion-header');
          acorItemHeader.addEventListener('click', ()=>{
            console.log('555');
            if(gr.classList.contains('active')){
              gr.classList.remove('active');
            }else{
              gr.classList.add('active');
            }
          })
        });
    });
  }
 
  Fancybox.bind("[data-fancybox]", {
    Thumbs: false,
    
  });
})

