document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Paket Vanila/3pcs', img: '1.jpg', price: 15000 },
            { id: 2, name: 'Paket Gula/6pcs', img: '2.jpg', price: 30000 },
            { id: 3, name: 'Paket Coklat/3pcs', img: '3.jpg', price: 15000 },
        ],
    }))
    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apa ada yang sama
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang ada, cek apakah sama
                this.items = this.items.map((item) => {
                    // jika barang beda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang suda ada, tambah jumah quantity dan total
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // ambil di item yang sama
            const cartItem = this.items.find((item) => item.id === id);


            //  jika item lebih dari 1
            if (cartItem.quantity > 1) {
                // telusuri satu satu
                this.items = this.items.map((item) => {
                    //   jika id tidak sama
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                // jika barang sisa satu
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});


// form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});
// ketika tombol di cheak out
checkoutButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // window.open('http://wa.me/62895414723838?text=' + encodeURIComponent(message));

    // minta transaksi

    try {
        const response = await fetch('php/placeOrder.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        // console.log(token);
        window.snap.pay(token);
    } catch (err) {
        console.log(err.message)
    }

});

// format pesan wa
const formatMessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.
        total)}\n`)}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`;

}

// konversi ke rupiah

const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

