// customerScript.js
refreshTable();

let customers =JSON.parse(localStorage.getItem('customers')) || [];

let editingIndex = -1;
document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (name === '' || email === '' || phone === '' || address === '') {
        alert('Please fill in all fields');
        return;
    }
    const formButton = document.querySelector('#customerForm button');
    if (editingIndex === -1) {
        addCustomer({ name, email, phone, address });
        refreshTable();
    } else {
        updateCustomer(editingIndex, { name, email, phone, address });
        formButton.innerText = 'Add Customer';
        editingIndex = -1; 
    }

    document.getElementById('customerForm').reset();
});

function addCustomer(customer) {
    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));
}


function updateCustomer(index, updatedCustomer) {
    customers[index] = updatedCustomer;
    updateCustomerInTable(index, updatedCustomer);
}


function updateCustomerInTable(index, customer) {
    const tableBody = document.querySelector('#customerTable tbody');
    const row = tableBody.rows[index];

    row.cells[0].innerText = customer.name;
    row.cells[1].innerText = customer.email;
    row.cells[2].innerText = customer.phone;
    row.cells[3].innerText = customer.address;
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    refreshTable();
}

function editCustomer(index) {
    const customer = customers[index];
    document.getElementById('name').value = customer.name;
    document.getElementById('email').value = customer.email;
    document.getElementById('phone').value = customer.phone;
    document.getElementById('address').value = customer.address;
    document.querySelector('#customerForm button').innerText = 'Update Customer';
    editingIndex = index;
}

function searchCustomer() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const tableRows = document.querySelectorAll('#customerTable tbody tr');

    tableRows.forEach((row, index) => {
        const name = row.cells[0].innerText.toLowerCase();
        if (name.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function refreshTable() {
        const customerTable = document.getElementById('customerTable');
        // Retrieve orders from localStorage
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        let body =`<tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>`
    
        customers.forEach((customer, index) => {
            body += `<tr>
                <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td class="actions">
                <button onclick="editCustomer(${index})">Edit</button>
                <button onclick="deleteCustomer(${index})">Delete</button>
            </td>
                </tr>
            `;
            customerTable.innerHTML=body;
        });
    
}
