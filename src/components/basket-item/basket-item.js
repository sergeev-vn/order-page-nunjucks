document.addEventListener('DOMContentLoaded', function () {
	removeItem();
	changeQuantity();
	changeQuantityOfInput();
});

function changeQuantityOfInput() {
	let inputItems = document.querySelectorAll('#quantity-num');
	let allPricesOfItems = getArrayOfPrices();

	for (let i = 0; i < inputItems.length; i++) {
		inputItems[i].addEventListener('change', function () {
			let basketItem = this.closest('.basket-item'),
				basketItemPrice = basketItem.querySelector('#price-item');

			basketItemPrice.textContent = allPricesOfItems[i] * inputItems[i].value;
			calcTotal();
		});
	}
}

function getArrayOfPrices() {
	let pricesOfItems = document.querySelectorAll('#price-item');
	let pricesOfItemsArr = [];

	for (let i = 0; i < pricesOfItems.length; i++) {
		let pricesOfItemNum = parseInt(pricesOfItems[i].textContent, 10);
		pricesOfItemsArr.push(pricesOfItemNum);
	}
	return pricesOfItemsArr;
}

function removeItem() {
	let removeItemBtn = document.querySelectorAll('#remove-item-btn');

	for (let i = 0; i < removeItemBtn.length; i++) {
		removeItemBtn[i].addEventListener('click', function () {
			let basketItem = this.closest('.basket-list__item');
			basketItem.remove();
			calcTotal();

			let basketItems = document.querySelectorAll('.basket-item');
			let basketItemsList = document.querySelector('.basket-list');
			if (!basketItems.length) {
				basketItemsList.innerHTML = 'There are no items in your cart.';
			}

			let counterItemsBasket = document.querySelector('.counter-cart'),
				counterItemsBasketNum = parseInt(counterItemsBasket.textContent, 10);
			counterItemsBasket.textContent = counterItemsBasketNum - 1;
		});
	}
}

function changeQuantity() {
	let addQuantityBtn = document.querySelectorAll('#plus-btn'),
		removeQuantityBtn = document.querySelectorAll('#minus-btn');

	for (let i = 0; i < addQuantityBtn.length; i++) {
		addQuantityBtn[i].addEventListener('click', function () {
			let basketItem = this.closest('.basket-item'),
				currentCount = basketItem.querySelector('#quantity-num');

			currentCount.value++;
			currentCount.dispatchEvent(new Event('change'));
		});
	}

	for (let i = 0; i < addQuantityBtn.length; i++) {
		removeQuantityBtn[i].addEventListener('click', function () {
			let basketItem = this.closest('.basket-item'),
				currentCount = basketItem.querySelector('#quantity-num');

			if (currentCount.value > 1) {
				currentCount.value--;
				currentCount.dispatchEvent(new Event('change'));
			}
		});
	}
}

function calcTotal() {
	let priceSubtotal = document.querySelector('#price-subtotal'),
		priceTotal = document.querySelector('#price-total'),
		priceTax = document.querySelector('#price-tax'),
		priceTaxNum = parseInt(priceTax.textContent, 10),
		priceShipping = document.querySelector('#price-shipping'),
		priceShippingNum = parseInt(priceShipping.textContent, 10),
		priceItems = document.querySelectorAll('#price-item');

	let sumOfBasketItems = 0;
	for (let i = 0; i < priceItems.length; i++) {
		sumOfBasketItems += parseInt(priceItems[i].textContent, 10);
	}

	priceSubtotal.textContent = sumOfBasketItems;
	priceTotal.textContent = sumOfBasketItems + priceShippingNum + priceTaxNum;
}
