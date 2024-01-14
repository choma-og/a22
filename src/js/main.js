import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import '@/styles/style.scss';
import axios from 'axios';
import Inputmask from 'inputmask';


//BURGER 
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu) {
	iconMenu.addEventListener("click", e => {
		e.preventDefault();
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	})
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.menu__link')

const linkAction = () =>{
    const menuBody = document.getElementById('menu-body')
    menuBody.classList.remove('_active')
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// CARD
var swiperHero = new Swiper(".hero__swiper", {
  loop: true,
  spaceBetween: 30,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// var bullets = document.querySelectorAll('.swiper-pagination-bullet');

// bullets.forEach(function (bullet, index) {
//   bullet.addEventListener('click', function () {
//     swiper.slideTo(index); // Изменяем слайд при нажатии на буллет
//   });
// });
var swiperGallery = new Swiper(".gallery__swiper", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 10,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
  720: {
    centeredSlides: true,
    spaceBetween: 40,
  },
}
});

/*=============== CARD ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.question__item')
accordionItems.forEach((item) => {
	const accoordionHeader = item.querySelector('.question__heading')
	accoordionHeader.addEventListener('click', () => {
		const openItem = document.querySelector('.acrd-open')
		toggleItem(item)
		if(openItem && openItem !== item) {
			toggleItem(openItem)
		}
	})
})
const toggleItem = (item) => {
		const accordionContent = item.querySelector('.question__content')
		if(item.classList.contains('acrd-open')) {
			accordionContent.removeAttribute('style')
			item.classList.remove('acrd-open')
		} else {
			accordionContent.style.height = accordionContent.scrollHeight + 'px'
			item.classList.add('acrd-open')
		}
	}

	// FORM

	/*=============== INPUT MASK ===============*/
const phones = document.querySelectorAll('[data-mask="phone"]');
let im = new Inputmask('+7 (999) 999-99-99');
console.log(phones);
im.mask(phones);

/*=============== AXIOS ===============*/
function validatePhone(phone)  {
  const cleanedPhone = phone.replace(/\D/g, "");
  console.log(new String(cleanedPhone).length)
  console.log(cleanedPhone.length === 11, "partial")

  if(cleanedPhone.length === 11) {
    return true; 
  } else {
    return false;
  }
}
function validateText(text)  {
  const trimmedText = text.trim();

    if (trimmedText.length >= 2) {
    return true;
  } else {
    return false;
  }
}
const validate = (input) => {
  const dataType = input.getAttribute("data-type");
  let res = true;
  switch(dataType) {
      case "phone": 
      res = validatePhone(input.value)
      break;
      case "text": 
      res = validateText(input.value)
      break;
  }
  console.log(input, res, dataType)
  return res;
}

let forms = document.querySelectorAll('.js-form');
console.log(forms)
forms.forEach((form) => {
  let formButton = form.querySelector(".js-form-submit");
	console.log(formButton)
	if(formButton) {
		formButton.addEventListener("click", (e) => {
		e.preventDefault();
		formButton.disabled = true;
		const inputs = form.querySelectorAll("input");
		const method = form.method;
		const action = form.action;
		let isValidated = true;
		let formData = [];

		inputs.forEach(input => {
      formData.push({
        name: input.name,
        value: input.value,
        isValidate: validate(input),
      })  
  })

	formData.forEach(item => {
    const input = form.querySelector(`[name="${item.name}"]`);
    const wrapper = input.parentNode;
    const errorBlock = wrapper.querySelector('.js-error');

    if(!item.isValidate) {
        isValidated = false;
        errorBlock.classList.add("_active")
    } else {
        errorBlock.classList.remove("_active")
    }
  })

	if(!isValidated) {
    formButton.disabled = false;
    return false;
  }

	axios({
		method,
		url: action,
		data: formData,
}).then((response) => {
		console.log("success");
		formButton.disabled = false;
		formButton.classList.add('succes');
		formButton.innerHTML = "Заявка отправлена";
      // Очистка полей ввода
  inputs.forEach(input => {
    input.value = "";
  });
}).catch((error) => {
		console.error(error)
		formButton.disabled = false;
		formButton.classList.add('succes');
		formButton.innerHTML = "Заявка отправлена";
      inputs.forEach(input => {
    input.value = "";
  });
	});
})
	}
})

let centerBrn = [53.38988962211063, 83.67874116024242];
function init() {
	let mapBrn = new ymaps.Map('map-brn', {
		center: centerBrn,
		zoom: 16,
	});
	let placemarkBrn = new ymaps.Placemark([53.38988962211063, 83.67854804119332], {}, {
		iconImageSize: [37, 37],
		iconImageOffset: [-20, -20]
	});
	mapBrn.controls.remove('geolocationControl');
	mapBrn.controls.remove('searchControl');
	mapBrn.controls.remove('trafficControl');
	mapBrn.controls.remove('typeSelector');
	mapBrn.controls.remove('rulerControl', {
		scaleLine: false,
	});
	mapBrn.geoObjects.add(placemarkBrn);
}
if(ymaps) {
	ymaps.ready(init);
	}

	// ========== MODAL HEADER ==========
const modalBody = document.querySelector('.modal__body');
const modalContent = document.querySelector('.modal__content');
const modalClose = document.querySelector(".modal__close");
const modalButtons = document.querySelectorAll('.js-modal-btn');
const errorBlock = document.querySelectorAll('.js-error');
modalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    document.body.classList.add("_lock");
    modalBody.classList.add("_active");
    modalContent.classList.add("_active");
  });
});

if (modalClose) {
  modalClose.addEventListener("click", (e) => {
    document.body.classList.remove("_lock");
    modalBody.classList.remove("_active");
    modalContent.classList.remove("_active");
    if (errorBlock) {
       errorBlock.forEach((error) => {
      error.classList.remove("_active");
    });
    }
    
  });
}

modalBody.addEventListener('touchmove', function (e) {
  if (modalBody.classList.contains("_active")) {
    e.preventDefault();
  }
});