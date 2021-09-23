let burgerBtn = document.querySelector('#humburger');
let aside = document.querySelector('.aside');

burgerBtn.addEventListener('click', function () {
	aside.classList.toggle('active');
});
