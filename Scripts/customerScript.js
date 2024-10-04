loadTable();
let customers =JSON.parse(localStorage.getItem('customers')) || [];

let editingIndex = -1;
function submitForm(){
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
        loadTable();
    } else {
        updateCustomer(editingIndex, { name, email, phone, address });
        formButton.innerText = 'Add Customer';
        editingIndex = -1; 
    }

    document.getElementById('customerForm').reset();
}

function addCustomer(customer) {
    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));
    loadTable();
}


function updateCustomer(index, updatedCustomer) {
    customers[index] = updatedCustomer;
    localStorage.setItem("customers", JSON.stringify(customers));
    loadTable();dTable();
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    loadTable();
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
    const customerTable = document.getElementById('customerTable');
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    let body = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>`;

    customers.forEach((customer, index) => {
        if (customer.name.toLowerCase().includes(searchInput)) {
            body += `<tr>
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.address}</td>
                        <td class="actions">
                            <button onclick="editCustomer(${index})">Edit</button>
                            <button onclick="deleteCustomer(${index})">Delete</button>
                        </td>
                    </tr>`;
        }
    });

    customerTable.innerHTML = body;
}

function loadTable() {
        const customerTable = document.getElementById('customerTable');
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
