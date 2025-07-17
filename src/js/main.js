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
   
    if (header && styckyAside) {
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
   
    // INPUT TYPE="FILE"
    const fileInputs = document.querySelectorAll(".fileUploadInput");

    if (fileInputs) {
      fileInputs.forEach((input) => {
        input.addEventListener("change", (event) => {
          const label = input.closest(".fileUpload-label");
          const labelTxt = label.querySelector(".fileUpload-name");
         
    
          // Получаем файл и его размер
          const file = input.files[0];
          const fileName = file?.name || "Заменить фото";
    
          if (file) {
            // Если файл соответствует требованиям
            labelTxt.textContent = fileName; // Отображаем имя файла
           
          }
          
        });
      });
    
      
    }
    /* =============== modal с атрибутом [data-modal] ===============*/ 
    const modalOpen = document.querySelectorAll('[data-btn]');
    const modalFrames = document.querySelectorAll('[data-modal]');
    
    if (modalFrames.length > 0) {
        const modalFramesClose = document.querySelectorAll('[data-close]');
    
        // Открытие модального окна
        for (let item of modalOpen) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); // Предотвращаем всплытие
    
                const itemAttr = item.getAttribute('data-btn');
    
                for (let frame of modalFrames) {
                    const frameAttr = frame.getAttribute('data-modal');
                    if (frameAttr === itemAttr) {
                        frame.classList.add('visible');
                        document.body.classList.add('lock');
                    }
                }
            });
        }
    
        // Закрытие модального окна при клике на крестик (data-close)
        for (let item of modalFramesClose) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); // Предотвращаем всплытие
    
                const parentModal = item.closest('[data-modal]');
                if (parentModal) {
                    // Закрываем текущее модальное окно
                    parentModal.classList.remove('visible');
    
                    // Закрываем все дочерние модальные окна внутри родителя
                    const childModals = parentModal.querySelectorAll('[data-modal].visible');
                    for (let child of childModals) {
                        child.classList.remove('visible');
                    }
    
                    // Проверяем, остались ли открытые модальные окна
                    const anyModalVisible = document.querySelector('[data-modal].visible');
                    if (!anyModalVisible) {
                        document.body.classList.remove('lock');
                    }
                }
            });
        }
    
        // Закрытие модальных окон по клику вне их
        document.addEventListener('click', function (e) {
            const target = e.target;
    
            // Проверяем, кликнули ли мы по data-modal, но не по data-btn внутри него
            if (target.matches('[data-modal]') && !target.querySelector('[data-btn]:hover')) {
                // Закрываем и текущее модальное окно, и его дочерние модалки
                target.classList.remove('visible');
                const childModals = target.querySelectorAll('[data-modal].visible');
                for (let child of childModals) {
                    child.classList.remove('visible');
                }
    
                // Проверяем, остались ли открытые модальные окна
                const anyModalVisible = document.querySelector('[data-modal].visible');
                if (!anyModalVisible) {
                    document.body.classList.remove('lock');
                }
            }
        });
    }
    // DROP SELECT
    document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    // Клик по кнопке. Открыть/Закрыть select
    dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('dropdown__list--visible');
      this.classList.toggle('dropdown__button--active');
    });
      

    // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
    dropDownListItems.forEach(function (listItem) {
      
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerText = this.innerText;
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        
        dropDownList.classList.remove('dropdown__list--visible');
        dropDownBtn.classList.remove('dropdown__button--active');
        
      });
    });

    // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click', function (e) {
      if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });

    // Нажатие на Tab или Escape. Закрыть дропдаун
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });
  });

    
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
  // 
  const hasHide = document.querySelectorAll('.has-hide');
  if(hasHide.length > 0){
      hasHide.forEach((box)=>{
        const hideCards = box.querySelectorAll('.product-card--hide');
        const showHideBtn = box.querySelector('.show-more-cards');
      
        showHideBtn.addEventListener('click', ()=>{
          if(hideCards.length >0 ){
             hideCards.forEach((crd)=>{
              if(crd.classList.contains('d-none')){
                crd.classList.remove('d-none');
                showHideBtn.textContent="Показать меньше";
              }else{
                crd.classList.add('d-none');
                showHideBtn.textContent="Показать больше";
              }
             })
          }
        });    
      });
  }
  //FOTORAMA
  let mySwiperThumb = new Swiper(".mySwiperThumb", {
    spaceBetween: 20,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".mySwiperThumb-next",
      prevEl: ".mySwiperThumb-prev",
    },
    });
    var mySwiperFotorama = new Swiper(".mySwiperFotorama", {
    spaceBetween: 10,
    speed: 800,
    pagination: {
        el: ".fotorama-swiper-pagination",
        clickable: true,
      },
   
    breakpoints:{
      768:{
        thumbs: {
          swiper:  mySwiperThumb,
       },
       pagination:false,
      }
    }
  });

  Fancybox.bind("[data-fancybox]", {
    Thumbs: false, // отключаем панель превью
    
  });
})

