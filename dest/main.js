// scroll menu in header
let menus = document.querySelectorAll('header .menu a');
let heightHeader = document.querySelector('header').offsetHeight;
sections = [];

function removeActiveMenu() {
    menus.forEach(function (menu_element, menu_index) {
        menu_element.classList.remove('active');
    })
}

menus.forEach(function (element, index) {
    let className = element.getAttribute('href').replace('#', '');
    let section = document.querySelector('.' + className);
    sections.push(section);
    element.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: section.offsetTop - heightHeader + 1,

            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function () {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
        if (positionScroll > section.offsetTop - heightHeader && positionScroll < section.offsetTop + section.offsetHeight) {
            removeActiveMenu();
            menus[index].classList.add('active');
        } else {
            menus[index].classList.remove('active');
        }
    })
});



// back to top
let backtotop = document.querySelector('.backtop');
backtotop.addEventListener('click', function () {
    window.scroll({
        top: 20,
        behavior: "smooth"
    });
});

let positionScrollProducts = document.querySelector('.products').offsetHeight;
window.addEventListener('scroll', function () {
    let scroll = window.pageYOffset;
    if (scroll > positionScrollProducts - heightHeader / 2) {
        backtotop.style.display = 'block';
    } else {
        backtotop.style.display = 'none';
    }
});

window.addEventListener('scroll', function () {
    let brgHeader = document.querySelector('.bgrheader');
    let scroll = window.pageYOffset;
    if (scroll > positionScrollProducts - heightHeader / 2) {
        brgHeader.classList.add('show');
    } else {
        brgHeader.classList.remove('show');
    }

});

// slider
let listItemSlider = document.querySelectorAll('.slider__item');
let currentSlider = 0;
let number = document.querySelector('.slider__bottom-paging .number'); //variable slider number
let dot = document.querySelectorAll('.slider__bottom-paging .dots li'); // variable slider dotted
// function callback , confirm index of slider
listItemSlider.forEach(function (itemSlider, index) {
    if (itemSlider.classList.contains('active')) {
        currentSlider = index;

    }
});
// slider number
function showNumber(index) {
    number.innerHTML = (index).toString().padStart(2, '0');
}
showNumber(currentSlider + 1);
//dotted slider
dot[currentSlider].classList.add('is-selected');

function goto(index) { // function callback , remove and add when push the button
    listItemSlider[currentSlider].classList.remove('active');
    listItemSlider[index].classList.add('active');
    dot[currentSlider].classList.remove('is-selected');
    dot[index].classList.add('is-selected');
    currentSlider = index;
    showNumber(currentSlider + 1);
}

//even bottom prev and next
document.querySelector('.btnctr.next').addEventListener('click', function () {
    if (currentSlider < listItemSlider.length - 1) {
        goto(currentSlider + 1);
    } else {
        goto(0);
    }
});
document.querySelector('.btnctr.prev').addEventListener('click', function () {
    if (currentSlider > 0) {
        goto(currentSlider - 1);
    } else {
        goto(listItemSlider.length - 1);
    }
});

//click dotted
dot.forEach(function (li, index) {
    li.addEventListener('click', function () {
        goto(index);
    });
});

//push video
let button_video = document.querySelectorAll('.video__item-img');
let popup_video = document.querySelector('.popup-video');
let close_video = document.querySelector('.close');
let iframe = document.querySelector('.popup-video iframe');
button_video.forEach(function (button) {
    button.addEventListener('click', function () {
        let video_id = button.getAttribute('data-video-id');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + video_id);
        popup_video.style.display = 'flex';
    });
});
close_video.addEventListener('click', function () {
    iframe.setAttribute('src', '');
    popup_video.style.display = 'none';
})
document.querySelector('.popup-video').addEventListener('click', function (e) {
    iframe.setAttribute('src', '');
    popup_video.style.display = 'none';
})

//lang option
let langCurrent = document.querySelector('.lang__current');
let langOpt = document.querySelector('.lang_option');
let langItems = document.querySelectorAll('.lang_option .lang_option-item');
let langSpan = document.querySelector('.lang__current span');
langCurrent.addEventListener('click', function (e) {
    e.stopPropagation();
    langOpt.classList.toggle('active');
});
langItems.forEach(function (item) {
    item.addEventListener('click', function () {
        let textItem = this.textContent;
        let textTemp = langSpan.textContent;
        langSpan.innerHTML = textItem;
        this.textContent = textTemp;
        langOpt.classList.remove('active');
    });
});
document.addEventListener('click', function () {
    langOpt.classList.remove('active');
});

// btnmenu
let btnmenu = document.querySelector('.btnmenu');
let navMenu = document.querySelector('.nav');
btnmenu.addEventListener('click', function () {
    btnmenu.classList.toggle('clicked');
    navMenu.classList.toggle('rpsmenu');
});

// tab news
let tagText = document.querySelectorAll('.news__tags-text .tag');
let tagList = document.querySelectorAll('.news__list');
tagText.forEach(function (item, index) {
    item.addEventListener('click', function () {
        let tagID = index + 1;
        console.log(tagID)
        tagText.forEach(function (tag) {
            tag.classList.remove('activebtn');
        });
        tagList.forEach(function (tags) {
            tags.classList.remove('activelist');
        });
        item.classList.add('activebtn');
        document.querySelector('.new__list-' + tagID).classList.add('activelist');
    });
});

//fag
let acc = document.querySelectorAll('.accordion');
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
        for (let j = 0; j < acc.length; j++) {
            if (i !== j) {
                acc[j].nextElementSibling.style.maxHeight = null;
                acc[j].classList.remove('active1');
            }
        }
        this.classList.toggle('active1');
        let panel = this.nextElementSibling;
        console.log(panel);
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
