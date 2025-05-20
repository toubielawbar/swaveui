/*!
 * SwaveUI v1.0.1 (https://swave-ui.com)
 * Copyright 2025 Oluwatobi H. Giwa
 * Licensed under MIT (https://github.com/toubielawbar/swaveui/blob/main/LICENSE)
 */

'use strict';

const getSiblings = node => [...node.parentNode.children].filter(element => element !== node);

const accordions = document.querySelectorAll('.sw-accordion');
const closeBtns = document.querySelectorAll('[data-close]');
const carousels = document.querySelectorAll('.sw-carousel');
const drawerTogglers = document.querySelectorAll('[data-toggle=drawer]');
const dropdownTogglers = document.querySelectorAll('[data-toggle=dropdown]');
const heroes = document.querySelectorAll('.sw-hero');
const inputs = document.querySelectorAll('.sw-input, .sw-input-file');
const inputAddons = document.querySelectorAll('.sw-form-addon');
const menuTogglers = document.querySelectorAll('.sw-menu-icon');
const modalTogglers = document.querySelectorAll('[data-toggle=modal]');
const navbars = document.querySelectorAll('.sw-navbar');
const navbarMobileTogglers = document.querySelectorAll('[data-toggle=navbar]')
const popoverTogglers = document.querySelectorAll('[data-toggle=popover]');
const progresses = document.querySelectorAll('.sw-progress');
const radioPairBtns = document.querySelectorAll('.sw-radio-pair');
const sidebars = document.querySelectorAll('.sw-sidebar');
const sidebarMobileTogglers = document.querySelectorAll('[data-toggle=sidebar]');
const snackbars = document.querySelectorAll('.sw-snackbar');
const snackbarTogglers = document.querySelectorAll('[data-toggle=snackbar]');
const tabs = document.querySelectorAll('.sw-tab');
const tooltipTogglers = document.querySelectorAll('[data-toggle=tooltip]');
const totops = document.querySelectorAll('.sw-totop');

function nextSlide(currentIndex, carouselWrapper, carouselIndicators, items) {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel(currentIndex, carouselWrapper, carouselIndicators);
}

function updateCarousel(currentIndex, carouselWrapper, carouselIndicators) {
    const offset = -currentIndex * 100;
    carouselWrapper.style.transform = `translateX(${offset}%)`;

    carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function openModal(modal) {modal.style.display = 'block';}
function closeModal(modal) {modal.style.display = 'none';}


function createPopup(type, toggler, data) {
    
    let popup = document.createElement('div');
    let popupClass, popupHeader, popupWrapper, popupLeft, popupTop;
    let content = data.content;
    let placement = data.placement || 'top';
    let title = data.title;
    let bg = data.bg;

    if (type === 'popover') {
        popupClass = 'sw-popover';
        popupHeader = 'sw-popover-header';
        popupWrapper = 'sw-popover-wrapper';
    } else {
        popupClass = 'sw-tooltip';
        popupHeader = 'sw-tooltip-header';
        popupWrapper = 'sw-tooltip-wrapper';
    }

    popup.classList.add(popupClass);
    if (title !== null) {
        popup.innerHTML = `
        <h3 class="${popupHeader}">${title}</h3>
        <div class="${popupWrapper}">${content}</div>
    `;
    } else {
        popup.innerHTML = `
        <div class="${popupWrapper}">${content}</div>
    `;
    }

    if (bg !== null) {popup.classList.add(bg)}

    document.body.appendChild(popup);

    const triggerPos = toggler.getBoundingClientRect();
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;
    const togglerHeight = triggerPos.height;

    let offsetTop = toggler.offsetTop;
    let offsetLeft = toggler.offsetLeft;

    console.log('left: '+toggler.offsetLeft);
    console.log('top: '+toggler.offsetTop);
    

    switch(placement) {
        case 'top':

            if (offsetTop === 0) {
                popup.classList.add(popupClass+'-right');
                popupTop = triggerPos.top;
                popupLeft = triggerPos.right + 5;
            } else if(offsetTop < 80)  {
                popup.classList.add(popupClass+'-right');
                popupTop = `${triggerPos.top + window.scrollY + (togglerHeight / 2) - (popupHeight / 2)}`;
                popupLeft = triggerPos.right + window.scrollX + 10;
            } else {

                if (offsetLeft === 0) {
                    popup.classList.add(popupClass+'-right');
                    popupTop = `${triggerPos.top + window.scrollY + (togglerHeight / 2) - (popupHeight / 2)}`;
                    popupLeft = triggerPos.right + window.scrollX + 10;
                } else if (offsetLeft < 65) {
                    popup.classList.add(popupClass+'-right');
                    popupTop = `${triggerPos.top + window.scrollY + (togglerHeight / 2) - (popupHeight / 2)}`;
                    popupLeft = triggerPos.right + window.scrollX + 10;
                } else {
                    popup.classList.add(popupClass+'-top');
                    popupTop = `${triggerPos.top + window.scrollY - popup.offsetHeight - 5}`;
                    popupLeft = `${triggerPos.left + window.scrollX + (triggerPos.width / 2) - (popup.offsetWidth / 2)}`;
                }

            }

            break;
        case 'right':

            if (offsetTop === 0) {
                popup.classList.add(popupClass+'-right');
                popupTop = triggerPos.top;
                popupLeft = triggerPos.right + 5;
            } else {

                if (offsetLeft > 1280) {
                    popup.classList.add(popupClass+'-left');
                    popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                    popupLeft = triggerPos.left - popupWidth - 5;
                } else {
                    popup.classList.add(popupClass+'-right');
                    popupTop = triggerPos.top + window.scrollY + (togglerHeight / 2) - (popupHeight / 2);
                    popupLeft = triggerPos.right + 5;
                }
            }

            break;

        case 'bottom':

            if (offsetLeft < 65) {

                if(offsetTop > 20) {
                    popup.classList.add(popupClass+'-right');
                    popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                    popupLeft = triggerPos.right + 5;
                } else {
                    popup.classList.add(popupClass+'-right');
                    popupTop = triggerPos.top;
                    popupLeft = triggerPos.right + 5;
                }
 
            } else {
                popup.classList.add(popupClass+'-bottom');
                popupLeft = triggerPos.left + window.scrollX + (triggerPos.width / 2) - (popupWidth / 2);
                popupTop = `${triggerPos.bottom + window.scrollY + 10}`;
            }

            break;    

        case 'left':

            if (type === 'popover') {
                
                if (offsetLeft < 295) {

                    if (offsetTop < 65) {
                            popup.classList.add(popupClass+'-right');
                            popupTop = triggerPos.top;
                            popupLeft = triggerPos.right + 5;
                        } else {
                            popup.classList.add(popupClass+'-right');
                            popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                            popupLeft = triggerPos.right + 5;
                        }
                    
                } else {
                    if (offsetTop < 65) {
                        popup.classList.add(popupClass+'-left');
                        popupTop = triggerPos.top;
                        popupLeft = triggerPos.left - popupWidth - 5;
                    } else {
                        popup.classList.add(popupClass+'-left');
                        popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                        popupLeft = triggerPos.left - popupWidth - 5;
                    }
                }
            } else if (type === 'tooltip') {
                if (offsetLeft < 100) {
                    popup.classList.add(popupClass+'-right');
                    popupTop = triggerPos.top;
                    popupLeft = triggerPos.right + 5;
                } else {
                    if (offsetTop < 45) {
                        popup.classList.add(popupClass+'-left');
                        popupTop = triggerPos.top;
                        popupLeft = triggerPos.left - popupWidth - 5;
                    } else {
                        popup.classList.add(popupClass+'-left');
                        popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                        popupLeft = triggerPos.left - popupWidth - 5;
                    }
                }
            }

            
            
            break;    

        default:
            if (offsetTop === 0) {
                popup.classList.add(popupClass+'-right');
                popupTop = triggerPos.top;
                popupLeft = triggerPos.right + 5;
            } else if(offsetTop < 85)  {
                popup.classList.add(popupClass+'-right');
                popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                popupLeft = triggerPos.right + 5;
            } else {

                if (offsetLeft === 0) {
                    popup.classList.add(popupClass+'-right');
                    popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                    popupLeft = triggerPos.right + 5;
                } else if (offsetLeft < 65) {
                    popup.classList.add(popupClass+'-right');
                    popupTop = triggerPos.top + (togglerHeight / 2) - (popupHeight / 2);
                    popupLeft = triggerPos.right + 5;
                } else {
                    popup.classList.add(popupClass+'-top');
                    // popupTop = triggerPos.top - popupHeight - 5;
                    // popupLeft = triggerPos.left + (triggerPos.width / 2) - (popupWidth / 2);

                    popupTop = `${triggerPos.top + window.scrollY - popup.offsetHeight - 5}`;
                    popupLeft = `${triggerPos.left + window.scrollX + (triggerPos.width / 2) - (popup.offsetWidth / 2)}`;
                }

            }
            break;
    }

    popup.style.top = `${popupTop}px`;
    popup.style.left = `${popupLeft}px`;

    // popup.style.top = `${triggerPos.top + window.scrollY - popup.offsetHeight - 5}px`;
    // popup.style.left = `${triggerPos.left + window.scrollX + (triggerPos.width / 2) - (popup.offsetWidth / 2)}px`;

    return popup;

}

function openSnackbar(snackbar) {snackbar.style.display = 'block';}

function closeSnackbar(snackbar) {
    if (snackbar.timeoutId) {
        clearTimeout(snackbar.timeoutId);
        setTimeout(() => snackbar.style.display = 'none', 500);
    } else {
        snackbar.style.display = 'none';
    }
}



function closeComponent() {
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {

            if (closeBtn.getAttribute('data-close') !== 'drawer' && closeBtn.getAttribute('data-close') !== 'modal' && closeBtn.getAttribute('data-close') !== 'snackbar') {
               if (closeBtn.parentElement.classList.contains('sw-wrapper') || closeBtn.getAttribute('data-close') === 'panel') {
                    closeBtn.parentElement.parentElement.classList.add('sw-close-hide');
                } else {
                    closeBtn.parentElement.classList.add('sw-close-hide');
                } 
            }

            
        });
    });
} 


function swAccordion() {
    accordions.forEach(accordion => {
        
        let accordionTogglers = accordion.querySelectorAll('.sw-accordion-toggler');
        let accordionCollapsible = accordion.getAttribute('data-collapsible');

        accordionTogglers.forEach(accordionToggler => {

            if (accordion.hasAttribute('data-control')) {
                if (accordion.getAttribute('data-control') === 'true') {
                    accordionToggler.classList.add('has-controls');
                }
            } 

            accordionToggler.addEventListener('click', () => {

                // toggle for hover state.
               // accordionToggler.classList.toggle('active');
                accordionToggler.classList.toggle('sw-open');

                let accordionWrapper = accordionToggler.nextElementSibling;

                if (accordionWrapper.style.display === 'block') {
                    accordionWrapper.style.display = 'none';
                    accordionWrapper.classList.add('sw-open')
                } else {
                    accordionWrapper.style.display = 'block';
                    accordionWrapper.classList.add('sw-open')
                }
                
                if (accordion.hasAttribute('data-collapsible') && accordionCollapsible === 'true') {

                    const otherAccordionWrappers = accordion.querySelectorAll('.sw-accordion-wrapper');
                    otherAccordionWrappers.forEach(otherAccordionWrapper => {
                        if (accordionWrapper !== otherAccordionWrapper) {
                            otherAccordionWrapper.style.display = 'none';
                            otherAccordionWrapper.parentElement.querySelector('.sw-accordion-toggler').classList.remove('sw-open');
                        }
                    });
                } 
            });
        });  
    });
}



function swCarousel() {
    carousels.forEach(carousel => {

        let carouselPrev = carousel.querySelector('.sw-carousel-control-prev');
        let carouselNext = carousel.querySelector('.sw-carousel-control-next');
        let carouselItems = carousel.querySelectorAll('.sw-carousel-item');
        let carouselWrapper = carousel.querySelector('.sw-carousel-wrapper'); 
        let carouselIndicators = carousel.querySelectorAll('.dot-nav');

        let currentIndex = 0;
        let autoPlayTimeout = 0;
        let duration = 3000;

        if (carousel.hasAttribute('data-timeout')) {
            autoPlayTimeout = parseInt(carousel.getAttribute('data-timeout'));
        } else {
            autoPlayTimeout = duration;
        }

        if (carouselPrev !== null) {
            carouselPrev.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
                updateCarousel(currentIndex, carouselWrapper, carouselIndicators);
            });
        }

        if (carouselNext !== null) {
            carouselNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                updateCarousel(currentIndex, carouselWrapper, carouselIndicators);
            });
        }

        carouselIndicators.forEach((carouselIndicator, index) => {
            carouselIndicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel(currentIndex, carouselWrapper, carouselIndicators);
            });
        });

        if (carousel.hasAttribute('data-autoplay') && carousel.getAttribute('data-autoplay') === 'true') {
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % carouselItems.length;
                    updateCarousel(currentIndex, carouselWrapper, carouselIndicators);
                }, autoPlayTimeout);
        }

       updateCarousel(currentIndex, carouselWrapper, carouselIndicators)
    });
}



function swDrawer() {
    drawerTogglers.forEach(drawerToggler => {
        let drawerOpen, drawerPush;

        let drawerId = drawerToggler.dataset['target'];
        let drawer = document.querySelector(drawerId);
        let drawerCloses = drawer.querySelectorAll('[data-close="drawer"]');

        if (drawer.classList.contains('sw-drawer-top')) {
            drawerOpen = 'sw-drawer-top-open';
            drawerPush = 'sw-drawer-top-push';
        } else if (drawer.classList.contains('sw-drawer-bottom')) {
            drawerOpen = 'sw-drawer-bottom-open';
            drawerPush = 'sw-drawer-bottom-push';
        } else if (drawer.classList.contains('sw-drawer-right')) {
            drawerOpen = 'sw-drawer-right-open';
            drawerPush = 'sw-drawer-right-push';
        } else if (drawer.classList.contains('sw-drawer-full')) {
            drawerOpen = 'sw-drawer-full-open';
            drawerPush = 'sw-drawer-full-push';
        } else {
            drawer.classList.add('sw-drawer-left');
            drawerOpen = 'sw-drawer-left-open';
            drawerPush = 'sw-drawer-left-push';
        }

        if (drawer) {
            drawerToggler.addEventListener('click', () => {
                drawer.classList.toggle(drawerOpen);

                if (drawer.hasAttribute('data-backdrop') && drawer.getAttribute('data-backdrop') === 'true') {
                    document.body.classList.toggle('sw-drawer-backdrop');
                }

                if (drawer.hasAttribute('data-body-scroll') && drawer.getAttribute('data-body-scroll') === 'true') {
                    document.body.style.overflowY = 'auto';
                }

                if (drawer.hasAttribute('data-push') && drawer.getAttribute('data-push') === 'true') {
                    document.querySelector('.sw-drawer-aside').classList.toggle(drawerPush);
                }

                if (drawerCloses) {
                    drawerCloses.forEach((drawerClose) => {
                        drawerClose.addEventListener('click', () => {
                            drawer.classList.remove(drawerOpen);
                            document.body.classList.remove('sw-drawer-backdrop');
                            document.querySelector('.sw-drawer-aside').classList.remove(drawerPush);
                        });
                    });
                }

            });
        }

        window.addEventListener('click', (event) => {
            if (!drawer.contains(event.target) && !drawerToggler.contains(event.target)) {
                
                if (drawer.classList.contains(drawerOpen)) {
                    document.body.classList.remove('sw-drawer-backdrop');
                }

                drawer.classList.remove(drawerOpen);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && drawer.classList.contains(drawerOpen)) {
                drawer.classList.remove(drawerOpen);
                document.body.classList.remove('sw-drawer-backdrop');
            }
        });

    });
}

function swDropdown() {
    dropdownTogglers.forEach(dropdownToggler => {
        let dropdown = dropdownToggler.parentElement;
        let dropdownContent = dropdownToggler.nextElementSibling;

        if (dropdownToggler.hasAttribute('data-control') && dropdownToggler.getAttribute('data-control') === 'true') {
            dropdownToggler.classList.add('sw-dropdown-toggler-icon')
        }

        dropdownToggler.addEventListener('click', () => {

            if (dropdown.hasAttribute('data-cascade') && dropdown.getAttribute('data-cascade') === 'true') {
                let cascadeLinks = dropdown.querySelectorAll('.sw-dropdown-link');

                cascadeLinks.forEach(cascadeLink => {
                    cascadeLink.addEventListener('click', () => {
                        let cascadeLinkValue = cascadeLink.textContent;
                        let cascadeInput = dropdown.querySelector('.sw-dropdown-value');

                        dropdownToggler.textContent = cascadeLinkValue;
                        cascadeInput.value = cascadeLink.getAttribute('data-cascade-value');

                        if (dropdown.classList.contains('sw-dropdown-fixed')) {
                            dropdownContent.style.width = `${dropdownToggler.offsetWidth}px`;
                        }

                    });
                });
            }

            if (dropdown.classList.contains('sw-dropdown-fixed')) {
                dropdownContent.style.width = `${dropdownToggler.offsetWidth}px`;
            }
            
            dropdownToggler.classList.toggle('active', !dropdownContent.classList.contains('sw-dropdown-show'));
            dropdownContent.classList.toggle('sw-dropdown-show');


            if (dropdownToggler.querySelector('.sw-dropdown-control') !== null) {
                let dropdownTogglerControl = dropdownToggler.querySelector('.sw-dropdown-control');
                if (dropdownContent.classList.contains('sw-dropdown-show')) {
                    dropdownTogglerControl.querySelector('.control-inactive').classList.add('sw-dropdown-hide');
                    dropdownTogglerControl.querySelector('.control-active').classList.remove('sw-dropdown-hide');
                } else {
                    dropdownTogglerControl.querySelector('.control-inactive').classList.remove('sw-dropdown-hide');
                    dropdownTogglerControl.querySelector('.control-active').classList.add('sw-dropdown-hide');
                }
            }
        });

        window.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                dropdownToggler.classList.remove('active');
                dropdownContent.classList.remove('sw-dropdown-show');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                dropdownContent.classList.remove('sw-dropdown-show');
                dropdownToggler.classList.remove('active');
            }
        });
        

    });
}


function swHero() {
    heroes.forEach(hero => {
        if (hero.hasAttribute('data-image')) {
            let heroImage = hero.getAttribute('data-image');

            if (hero.hasAttribute('data-overlay')) {
                let heroOverlay = hero.getAttribute('data-overlay');
                hero.style.backgroundImage = "linear-gradient(rgba(0,0,0,"+heroOverlay+"), rgba(0,0,0,"+heroOverlay+")), url('" + heroImage +"')";
            } else {
                hero.style.backgroundImage = "url('" + heroImage +"')";
            }
        }
    });
}

function swInput() {
    inputs.forEach(input => {
        if (input.hasAttribute('placeholder') && input.hasAttribute('data-placeholder-effect') && input.getAttribute('data-placeholder-effect') === 'true') {
            const placeholder = input.getAttribute('placeholder');
            input.addEventListener('focus', () => {
                input.setAttribute('placeholder', '');
            });

            input.addEventListener('blur', () => {
                input.setAttribute('placeholder', placeholder);
            });
        }

        if (input.hasAttribute('data-focus-effect')) {
            const inputFocus = input.getAttribute('data-focus-effect');
            input.addEventListener('focus', () => {
                input.style.borderColor = inputFocus.split('-').pop();
                input.style.setProperty('border-color', inputFocus.split('-').pop(), 'important');
            });

            input.addEventListener('blur', () => {
                input.style.borderColor = inputFocus.split('-').pop();
                input.style.setProperty('border-color', '');
            });
        }
    });
}


function swInputAddon() {
    inputAddons.forEach(inputAddon => {
        if (inputAddon.hasAttribute('data-focus')) {
            const inputAddonFocus = inputAddon.getAttribute('data-focus');
            let inputAddonField = inputAddon.querySelector('.sw_form-input');

            inputAddonField.addEventListener('focus', () => {

                inputAddonField.style.borderColor = inputAddonFocus.split('-').pop();
                inputAddonField.style.setProperty('border-color', inputAddonFocus.split('-').pop(), 'important');

                inputAddon.querySelectorAll('.addon-icon').forEach(inputAddonIcon => {
                    inputAddonIcon.style.borderColor = inputAddonFocus.split('-').pop();
                    inputAddonIcon.style.setProperty('border-color', inputAddonFocus.split('-').pop(), 'important');
                });
            });

            inputAddonField.addEventListener('blur', () => {
                inputAddonField.style.borderColor = inputAddonFocus.split('-').pop();
                inputAddonField.style.setProperty('border-color', '');

                inputAddon.querySelectorAll('.addon-icon').forEach(inputAddonIcon => {
                    inputAddonIcon.style.borderColor = inputAddonFocus.split('-').pop();
                    inputAddonIcon.style.setProperty('border-color', '');
                });
            });
        }
    })
}

function swMenu() {
    menuTogglers.forEach(menuToggler => {
        menuToggler.addEventListener('click', () => {
            if (menuToggler.hasAttribute('data-toggle-icon') && menuToggler.getAttribute('data-toggle-icon') === 'true') {
                menuToggler.classList.toggle('sw-menu-icon-close');
            }
        })
    })
}

function swModal() {
    modalTogglers.forEach(modalToggler => {
        let modalId = modalToggler.dataset['target'];
        let modal = document.querySelector(modalId);
        
        if (modal !== null) {
            modalToggler.addEventListener('click', () => openModal(modal));

            let modalClose = modal.querySelectorAll('[data-close="modal"]');
            if (modalClose) {
                modalClose.forEach((element) => {
                    element.addEventListener('click', () => closeModal(modal));
                });
            }

            window.addEventListener('click', (event) => {
                event.target === modal ? closeModal(modal) : null;
            });
    
            document.addEventListener('keydown', (event) => {
                event.key === 'Escape' ? closeModal(modal) : null;
            });

        }

    });
}


function swNavbar() {
    navbars.forEach(navbar => {
        let scrollBg, scrollColor, scrollShadow;
        let navbarLinks = navbar.querySelectorAll('.sw-navbar-link');

        if (navbar.hasAttribute('data-onscroll-bg')) {
            scrollBg = navbar.getAttribute('data-onscroll-bg');

            document.styleSheets[0].insertRule(
                '.navbar-scroll-bg { background-color: '+scrollBg+' !important; }',
                document.styleSheets[0].cssRules.length
              );
        }

        if (navbar.hasAttribute('data-onscroll-color')) {
            scrollColor = navbar.getAttribute('data-onscroll-color');

            document.styleSheets[0].insertRule(
                '.navbar-scroll-color { color: '+scrollColor+' !important; }',
                document.styleSheets[0].cssRules.length
              );
        }

        if (navbar.hasAttribute('data-onscroll-shadow') && navbar.getAttribute('data-onscroll-shadow') === 'true') {
            scrollShadow = 'sw-shadow';
        }

        if (navbar.classList.contains('has-sidebar')) {
            const navbarWidth = navbar.offsetWidth;
            const sidebarWidth = document.querySelector('.sw-sidebar').offsetWidth;
            navbar.style.width = (navbarWidth - sidebarWidth)+'px';
            navbar.classList.add('sw-ml-auto');
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scroll-bg');
                //navbar.querySelector('.sw-navbar-link').classList.add('navbar-scroll-color');
                navbar.classList.add(scrollShadow);

                navbarLinks.forEach(navbarLink => {
                    navbarLink.classList.add('navbar-scroll-color')
                });

            } else if (window.scrollY < 50) {
                navbar.classList.remove(scrollShadow);
                navbar.classList.remove('navbar-scroll-bg');
                navbarLinks.forEach(navbarLink => {
                    navbarLink.classList.remove('navbar-scroll-color')
                });
            }
        }); 
    });

    navbarMobileTogglers.forEach(navbarMobileToggler => {

        let navbar = navbarMobileToggler.parentElement;
        let navbarWidget = navbar.querySelector('.sw-navbar-widget');

        navbarMobileToggler.addEventListener('click', () => {
            //navbar.classList.toggle('sw-navbar-mobile')
            navbarWidget.classList.toggle('sw-navbar-mobile-menu-horizontal')
        })

    })
}

function swPopover() {
    popoverTogglers.forEach(popoverToggler => {
        
        let popoverContent = popoverToggler.getAttribute('data-content');
        let popoverPlacement = popoverToggler.getAttribute('data-placement');
        let popoverTitle = popoverToggler.getAttribute('data-title');
        let popoverBg = popoverToggler.getAttribute('data-bg');

        let popoverData = {'content': popoverContent, 'placement': popoverPlacement, 'title': popoverTitle, 'bg': popoverBg}
        popoverToggler.addEventListener('click', (event) => {
            event.preventDefault();

            let existingPopover = popoverToggler.nextElementSibling;
            if (existingPopover && existingPopover.classList.contains('sw-popover')) {
                existingPopover.remove();
            } else {
                let popover = createPopup('popover', popoverToggler, popoverData);
                popoverToggler.parentNode.insertBefore(popover, popoverToggler.nextSibling);
            }
            
        });
    });
}

function swProgress() {
    progresses.forEach(progress => {
        if (progress.hasAttribute('data-value')) {
            let progressValue = progress.getAttribute('data-value');
            progress.querySelector('.sw-progress-bar').style.width = progressValue + '%';
        }
    });
}

function swRadio() {
    radioPairBtns.forEach(radioPairBtn => {
        let radioBtns = radioPairBtn.querySelectorAll('.sw-radio');

        radioBtns.forEach(radioBtn => {
            radioBtn.addEventListener('click', () => { 
                radioBtns.forEach(btn => {
                    if (btn !== radioBtn) {
                        btn.checked = false;
                    }
                });
            });
        });
    });
}

function swSidebar() {
    sidebars.forEach(sidebar => {
        if (sidebar.classList.contains('has-navbar')) {
            const navbarHeight = document.querySelector('.sw-navbar').offsetHeight;
            sidebar.style.top = `${navbarHeight}px`;
        }
    });

    sidebarMobileTogglers.forEach(sidebarMobileToggler => {
        let sidebarId = sidebarMobileToggler.dataset['target']
        let mobileSidebar = document.querySelector(sidebarId);

        sidebarMobileToggler.addEventListener('click', () => {
            mobileSidebar.classList.toggle('sw-sidebar-show');
        });
    });
}

function swSnackbar() {
    snackbarTogglers.forEach(snackbarToggler => {
        let snackbarId = snackbarToggler.dataset['target'];
        let snackbar = document.querySelector(snackbarId);

        if (snackbar !== null) {
            snackbarToggler.addEventListener('click', () => {
                openSnackbar(snackbar);

                if (snackbar.hasAttribute("data-timeout")){
                    snackbar.timeoutId = setTimeout(() => closeSnackbar(snackbar), snackbar.getAttribute("data-timeout"));
                }
            });
        }
    });

    snackbars.forEach(snackbar => {
        let snackbarClose = snackbar.querySelector('[data-close="snackbar"]');

        if (snackbarClose) {
            snackbarClose.addEventListener('click', () => closeSnackbar(snackbar));
        }

        if (snackbar.hasAttribute('data-mode') && snackbar.getAttribute('data-mode') === 'live') {
            window.addEventListener('load', () => {
                openSnackbar(snackbar);
            });

            if (snackbar.hasAttribute("data-timeout")){
                snackbar.timeoutId = setTimeout(() => closeSnackbar(snackbar), snackbar.getAttribute("data-timeout"));
            }
        }

        if (!snackbar.hasAttribute('data-placement')) {
            snackbar.setAttribute('data-placement', 'bottom-center');
        }
    });
}

function swTab() {
    tabs.forEach(tab => {
        const tabLinks = tab.querySelectorAll('.sw-tab-link');
        tabLinks.forEach(tabLink => {
            tabLink.addEventListener('click', (event) => {
                event.preventDefault();
                const tabId = tabLink.getAttribute('href');

                if (!tabLink.classList.contains('link-active')) {
                    tab.querySelector('.link-active').classList.remove('link-active');
                    tabLink.classList.add('link-active');
                }

                if (!tab.querySelector(tabId).classList.contains('content-active')) {
                    tab.querySelector('.content-active').classList.remove('content-active');
                    tab.querySelector(tabId).classList.add('content-active');
                }
            });
        });
    });
}

function swTooltip() {
    tooltipTogglers.forEach(tooltipToggler => {

        let tooltipId = tooltipToggler.dataset['target'];

        let tooltipContent = tooltipToggler.getAttribute('data-content');
        let tooltipPlacement = tooltipToggler.getAttribute('data-placement');

        let tooltipData = {'content': tooltipContent, 'placement': tooltipPlacement, 'id': tooltipId, 'title': null};

        tooltipToggler.addEventListener("mouseover", (event) => {
            event.preventDefault();
            let tooltip =  createPopup('tooltip', tooltipToggler, tooltipData);
            tooltipToggler.parentNode.insertBefore(tooltip, tooltipToggler.nextSibling);
        });

        tooltipToggler.addEventListener("mouseout", (event) => {
            event.preventDefault();
            let existingTooltip = tooltipToggler.nextElementSibling;
            if (existingTooltip && existingTooltip.classList.contains('sw-tooltip')) {
                existingTooltip.remove();
            }
        });

    });
}

function swToTop() {
    totops.forEach(totop => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                totop.style.display = 'flex';
            } else {
                totop.style.display = 'none';
            }
        });

        totop.addEventListener('click', (event) => {
            event.preventDefault();
            // if (window.scrollY !== 0) {
            //     window.scrollBy(0, -20);
            //     //requestAnimationFrame();
            // }

            window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
        });

    });
}

closeComponent();
swAccordion();
swCarousel();
swDrawer();
swDropdown();
swHero();
swInput();
swInputAddon();
swMenu();
swModal();
swNavbar();
swPopover();
swProgress();
swRadio();
swSidebar();
swSnackbar();
swTab();
swTooltip();
swToTop();