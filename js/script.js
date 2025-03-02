// Toggle class active menu
const navbarNav = document.querySelector('.navbar-nav');

// Ketika diklik
document.querySelector('#donut-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};


// toggle kelas aktiv search
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah aksi default jika tombol berada dalam form
    searchForm.classList.toggle('active');
    searchBox.focus();
});

// toggle aktif untuk shopping
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active'); // Perbaikan nama variabel
    e.preventDefault();
};



// klik di luar side bar
const dm = document.querySelector ('#donut-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');


document.addEventListener('click', function(e) {
    if(!dm.contains(e.target)&& !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if(!sb.contains(e.target)&& !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if(!sc.contains(e.target)&& !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});

// modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) =>{
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };

})



// klik tombol close
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};


// klik di luar tombol
window.onclick = (e) => {
    if (e.target ===itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
};
