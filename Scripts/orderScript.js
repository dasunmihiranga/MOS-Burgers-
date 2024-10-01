document.addEventListener('DOMContentLoaded', () => {
    const orderTable = document.getElementById('orderTable');
    // Retrieve orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    
    let body =`<tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Contact No</th>
                <th>Items</th>
                <th>Discount</th>
                <th>Total Price</th>
            </tr>`

    // Display all orders
    orders.forEach((order, index) => {
        body += `<tr>
            <td>${index + 1}</td>
            <td>${order.customerName}</td>
            <td>${order.contactNo}</td>
            <td>
                <ul>
                    ${order.items.map(item => `<li>${item.name} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
                </ul>
            </td>
            <td>Rs. ${order.discount.toFixed(2)}</td>
            <td>Rs. ${order.totalPrice.toFixed(2)}</td>
            </tr>
        `;
        orderTable.innerHTML=body;;
    });
});

// function saveOrdersToLocalStorage(orders) {
//     localStorage.setItem('orders', JSON.stringify(orders));
// }

// function addOrder(newOrder) {
//     // Retrieve existing orders from localStorage
//     let orders = JSON.parse(localStorage.getItem('orders')) || [];
//     // Add the new order to the array
//     orders.push(newOrder);
//     // Save the updated orders array to localStorage
//     saveOrdersToLocalStorage(orders);
// }
