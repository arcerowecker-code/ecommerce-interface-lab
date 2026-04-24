
class Product {
  constructor(id, name, price, image, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
  }
}


const products = [
  new Product(1,  "Wireless Headphones",    29.99,  "https://via.placeholder.com/300x200?text=Headphones",   "electronics"),
  new Product(2,  "Adidas Running Shoes",   49.99,  "https://via.placeholder.com/300x200?text=Shoes",        "shoes"),
  new Product(3,  "Prada Bag",              19.99,  "https://via.placeholder.com/300x200?text=Bag",          "accessories"),
  new Product(4,  "Smart Watch",           129.99,  "https://via.placeholder.com/300x200?text=SmartWatch",   "electronics"),
  new Product(5,  "Leather Jacket",        149.99,  "https://via.placeholder.com/300x200?text=Jacket",       "clothing"),
  new Product(6,  "Running Shorts",         24.99,  "https://via.placeholder.com/300x200?text=Shorts",       "clothing"),
  new Product(7,  "Sunglasses",             39.99,  "https://via.placeholder.com/300x200?text=Sunglasses",   "accessories"),
  new Product(8,  "Basketball Shoes",       89.99,  "https://via.placeholder.com/300x200?text=BballShoes",   "shoes"),
  new Product(9,  "Bluetooth Speaker",      59.99,  "https://via.placeholder.com/300x200?text=Speaker",      "electronics"),
  new Product(10, "Denim Jeans",            54.99,  "https://via.placeholder.com/300x200?text=Jeans",        "clothing"),
  new Product(11, "Cap / Hat",              14.99,  "https://via.placeholder.com/300x200?text=Cap",          "accessories"),
  new Product(12, "USB-C Charger",          19.99,  "https://via.placeholder.com/300x200?text=Charger",      "electronics"),
];



let cart = [];


{Product} list - 

function renderProducts(list) {

  const grid = document.querySelector('.product-grid');
  if (!grid) return; 

  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }


  list.forEach(function(product) {

    const article = document.createElement('article');


    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;


    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(product.name));


    const pPrice = document.createElement('p');
    pPrice.classList.add('price');
    pPrice.appendChild(document.createTextNode(product.price.toFixed(2)));


    const detailLink = document.createElement('a');
    detailLink.href = 'WST LAB3 (3).html';
    const detailBtn = document.createElement('button');
    detailBtn.appendChild(document.createTextNode('View Details'));
    detailLink.appendChild(detailBtn);

    const btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Add to Cart'));
    btn.setAttribute('data-id', product.id);  
    btn.classList.add('add-to-cart-btn');

  
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(pPrice);
    article.appendChild(detailLink);
    article.appendChild(btn);


    grid.appendChild(article);
  });
}

function renderCart() {
  const cartList = document.querySelector('#cart-list');
  const totalEl  = document.querySelector('#cart-total');
  const emptyMsg = document.querySelector('#empty-cart');
  const cartSection = document.querySelector('.cart-section');

  if (!cartList) return; 

 
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }

  if (cart.length === 0) {
   
    if (emptyMsg)    emptyMsg.style.display = 'block';
    if (cartSection) cartSection.style.display = 'none';
    return;
  }


  if (emptyMsg)    emptyMsg.style.display = 'none';
  if (cartSection) cartSection.style.display = 'block';


  cart.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('cart-item');

 
    const img = document.createElement('img');
    img.src = item.product.image;
    img.alt = item.product.name;


    const div = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(item.product.name));

    const pPrice = document.createElement('p');
    pPrice.classList.add('price');
    pPrice.appendChild(document.createTextNode(item.product.price.toFixed(2)));

  
    const qtyLabel = document.createElement('label');
    qtyLabel.appendChild(document.createTextNode('Quantity: '));

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.min  = '0';
    qtyInput.value = item.quantity;
    qtyInput.style.width = '80px';
    qtyInput.setAttribute('data-id', item.product.id);


    const removeBtn = document.createElement('button');
    removeBtn.appendChild(document.createTextNode('Remove'));
    removeBtn.setAttribute('data-remove-id', item.product.id);
    removeBtn.style.marginLeft = '1rem';
    removeBtn.style.background = '#e74c3c';

    div.appendChild(h3);
    div.appendChild(pPrice);
    div.appendChild(qtyLabel);
    div.appendChild(qtyInput);
    div.appendChild(removeBtn);


    li.appendChild(img);
    li.appendChild(div);
    cartList.appendChild(li);
  });

  const total = cart.reduce(function(sum, item) {
    return sum + (item.product.price * item.quantity);
  }, 0);

  if (totalEl) {

    while (totalEl.firstChild) totalEl.removeChild(totalEl.firstChild);
    totalEl.appendChild(document.createTextNode(total.toFixed(2)));
  }
}


{number|string} productId

function addToCart(productId) {
  const id = parseInt(productId);
  const product = products.find(function(p) { return p.id === id; });
  if (!product) return;


  const existing = cart.find(function(item) { return item.product.id === id; });
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product: product, quantity: 1 });
  }


  sessionStorage.setItem('cart', JSON.stringify(cart.map(function(item) {
    return { id: item.product.id, quantity: item.quantity };
  })));
}


function loadCartFromStorage() {
  const stored = sessionStorage.getItem('cart');
  if (!stored) return;
  try {
    const parsed = JSON.parse(stored);
    cart = parsed.map(function(entry) {
      const product = products.find(function(p) { return p.id === entry.id; });
      return product ? { product: product, quantity: entry.quantity } : null;
    }).filter(Boolean);
  } catch(e) {
    cart = [];
  }
}


document.body.addEventListener('click', function(event) {
  const target = event.target;


  if (target.classList.contains('add-to-cart-btn') && target.hasAttribute('data-id')) {
    const productId = target.getAttribute('data-id');
    addToCart(productId);
    renderCart();

 
    const card = target.closest('article');
    if (card) {
      card.classList.add('fade-in');

      setTimeout(function() {
        card.classList.remove('fade-in');
      }, 600);
    }
  }

 
  if (target.hasAttribute('data-remove-id')) {
    const removeId = parseInt(target.getAttribute('data-remove-id'));
 
    cart = cart.filter(function(item) { return item.product.id !== removeId; });
    sessionStorage.setItem('cart', JSON.stringify(cart.map(function(item) {
      return { id: item.product.id, quantity: item.quantity };
    })));
    renderCart();
  }
});

document.body.addEventListener('change', function(event) {
  const target = event.target;

  if (target.type === 'number' && target.hasAttribute('data-id')) {
    const productId = parseInt(target.getAttribute('data-id'));
    const newQty    = parseInt(target.value);

    if (isNaN(newQty) || newQty <= 0) {
   
      cart = cart.filter(function(item) { return item.product.id !== productId; });
    } else {
      const existing = cart.find(function(item) { return item.product.id === productId; });
      if (existing) existing.quantity = newQty;
    }

    sessionStorage.setItem('cart', JSON.stringify(cart.map(function(item) {
      return { id: item.product.id, quantity: item.quantity };
    })));
    renderCart();
  }
});


function initCheckoutForm() {
  const form = document.querySelector('.checkout-layout form');
  if (!form) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    let valid = true;

 
    function validateField(input, errorId, message) {
      let errorEl = document.querySelector('#' + errorId);

      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.id = errorId;
        errorEl.style.color = '#e74c3c';
        errorEl.style.fontSize = '0.85rem';
        input.parentNode.appendChild(errorEl);
      }

      if (!input.value.trim()) {
        input.classList.add('error');
        errorEl.textContent = message;
        valid = false;
      } else {
        input.classList.remove('error');
        errorEl.textContent = '';
      }
    }


    const fullname = document.querySelector('#fullname');
    const street   = document.querySelector('#street');
    const zip      = document.querySelector('#zip');

    if (fullname) validateField(fullname, 'err-fullname', 'Full name is required.');
    if (street)   validateField(street,   'err-street',   'Street address is required.');
    if (zip) {
      let errorEl = document.querySelector('#err-zip');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.id = 'err-zip';
        errorEl.style.color = '#e74c3c';
        errorEl.style.fontSize = '0.85rem';
        zip.parentNode.appendChild(errorEl);
      }
      if (!zip.value.trim()) {
        zip.classList.add('error');
        errorEl.textContent = 'Zip code is required.';
        valid = false;
      } else if (!/^\d{4,10}$/.test(zip.value.trim())) {
        zip.classList.add('error');
        errorEl.textContent = 'Enter a valid zip code (numbers only).';
        valid = false;
      } else {
        zip.classList.remove('error');
        errorEl.textContent = '';
      }
    }

   
    const paymentSelected = form.querySelector('input[name="payment"]:checked');
    let paymentError = document.querySelector('#err-payment');
    if (!paymentError) {
      paymentError = document.createElement('span');
      paymentError.id = 'err-payment';
      paymentError.style.color = '#e74c3c';
      paymentError.style.fontSize = '0.85rem';
      const paymentFieldset = form.querySelector('fieldset:nth-of-type(2)');
      if (paymentFieldset) paymentFieldset.appendChild(paymentError);
    }
    if (!paymentSelected) {
      paymentError.textContent = 'Please select a payment method.';
      valid = false;
    } else {
      paymentError.textContent = '';
    }

    if (valid) {

      cart = [];
      sessionStorage.removeItem('cart');
      console.log('Order placed successfully!');

      window.location.href = 'WST LAB3 (6).html';
    }
  });
}


const currentUser = {
  name: 'Juan dela Cruz',
  orderHistory: [
    {
      id: '#12345',
      date: 'Jan 15, 2024',
      total: 109.97,
      items: [
        { name: 'Headphones', qty: 2, price: 59.98 },
        { name: 'Shoes',      qty: 1, price: 49.99 },
      ],
    },
    {
      id: '#67890',
      date: 'Nov 05, 2023',
      total: 19.99,
      items: [
        { name: 'Prada Bag', qty: 1, price: 19.99 },
      ],
    },
  ],
};


function initAccountPage() {
  const dashHeader = document.querySelector('#order-history');
  if (!dashHeader) return; // Not on account page

 
  const pageHeader = document.querySelector('header h1');
  if (pageHeader) {
    pageHeader.textContent = 'Welcome back, ' + currentUser.name + ' — UEPSHOP Dashboard';
  }


  const detailsEls = document.querySelectorAll('.order-card details');


  detailsEls.forEach(function(detailsEl, index) {
    const summary = detailsEl.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', function() {
 
      if (detailsEl.dataset.loaded === 'true') return;

      const order = currentUser.orderHistory[index];
      if (!order) return;

   
      Array.from(detailsEl.children).forEach(function(child) {
        if (child.tagName !== 'SUMMARY') detailsEl.removeChild(child);
      });

      const wrapper = document.createElement('div');
      wrapper.style.padding = '1rem 0';

      order.items.forEach(function(item) {
        const p = document.createElement('p');
        p.textContent = item.name + ' × ' + item.qty + ' = ₱' + item.price.toFixed(2);
        wrapper.appendChild(p);
      });

      const hr = document.createElement('hr');
      wrapper.appendChild(hr);

      const totalP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = 'Total: ₱' + order.total.toFixed(2);
      totalP.appendChild(strong);
      wrapper.appendChild(totalP);

      detailsEl.appendChild(wrapper);
      detailsEl.dataset.loaded = 'true'; 
    });
  });
}


function initProductFilters() {
  const filterForm = document.querySelector('aside form');
  if (!filterForm) return;

  filterForm.addEventListener('submit', function(event) {
    event.preventDefault();

  
    const checkedBoxes = Array.from(
      filterForm.querySelectorAll('input[name="category"]:checked')
    ).map(function(cb) { return cb.value; });

   
    let filtered = checkedBoxes.length > 0
      ? products.filter(function(p) { return checkedBoxes.includes(p.category); })
      : products.slice();

 
    const sortVal = filterForm.querySelector('input[name="sort"]:checked');
    if (sortVal) {
      if (sortVal.value === 'low-high') {
        filtered.sort(function(a, b) { return a.price - b.price; });
      } else if (sortVal.value === 'high-low') {
        filtered.sort(function(a, b) { return b.price - a.price; });
      }
    }

    renderProducts(filtered);
  });
}


function initCartPage() {

  const staticUl = document.querySelector('#cart-list-static');
  if (!staticUl) return;

  const container = document.querySelector('.container');
  if (!container) return;

 
  const ul = document.createElement('ul');
  ul.id = 'cart-list';
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  ul.style.marginBottom = '2rem';
  container.replaceChild(ul, staticUl);

  renderCart();
}


document.addEventListener('DOMContentLoaded', function() {

  loadCartFromStorage();

  const path = window.location.pathname;
  const title = document.title;


  if (document.querySelector('.product-grid') && title.includes('Products')) {
    renderProducts(products);
    initProductFilters();
  }

  if (title.includes('Cart')) {
    initCartPage();
  }


  if (title.includes('Checkout')) {
    initCheckoutForm();
  }


  if (title.includes('Dashboard')) {
    initAccountPage();
  }
});
