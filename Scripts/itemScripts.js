let items = [];
loadInitial();
function loadInitial() {
  if (JSON.parse(localStorage.getItem("items")) == null) {
    console.log("done");
    loadInitialItems();
  } else {
    items = JSON.parse(localStorage.getItem("items"));
    loadTable();
  }
}
async function loadInitialItems() {
  items = await (await fetch("json/items.json")).json();
  items.forEach((item) => {
    addItem(item);
  });
  localStorage.setItem("items", JSON.stringify(items));
  loadTable();
}

let editingIndex = -1;

function submitForm() {
  const itemno = document.getElementById("itemno").value.trim();
  const itemtype = document.getElementById("itemtype").value.trim();
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const image = document.getElementById("image").files[0];

  if (
    itemno === "" ||
    itemtype === "" ||
    name === "" ||
    price === "" ||
    !image
  ) {
    alert("Please fill in all fields and select an image");
    return;
  }

  // Convert the image to a base64 string
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = function () {
    const imageUrl = reader.result;

    if (editingIndex === -1) {
      addItem({ itemno, itemtype, name, price, imageUrl });
    } else {
      updateItem(editingIndex, {
        itemno,
        itemtype,
        name,
        price,
        imageUrl,
      });
      document.querySelector("#itemForm button").innerText = "Add Item";
      editingIndex = -1;
    }

    document.getElementById("itemForm").reset();
  };
}

function addItem(item) {
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  console.log(items);
  loadTable();
}

function updateItem(index, updatedItem) {
  items[index] = updatedItem;
  localStorage.setItem("items", JSON.stringify(items));
  loadTable();
}

loadTable();
function loadTable() {
  const itemTable = document.getElementById("itemTable");
  const items = JSON.parse(localStorage.getItem("items")) || [];
  let body = ` <tr>
                    <th>Item Number</th>
                    <th>Item Type</th>
                    <th>Name</th>
                    <th>Price(Rs.)</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>`;

  items.forEach((item, index) => {
    body += `<tr>
               <td>${item.itemno}</td>
                <td>${item.itemtype}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><img src="${item.imageUrl}" alt="${item.name}" class="item-image"></td>
                <td class="actions">
                    <button onclick="editItem(${index})" class="button">Edit</button>
                    <button onclick="deleteItem(${index})" class="button">Delete</button>
                </td>
            </tr>
            `;
    itemTable.innerHTML = body;
  });
}


function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  loadTable();
}

function editItem(index) {
  const item = items[index];
  document.getElementById("itemno").value = item.itemno;
  document.getElementById("itemtype").value = item.itemtype;
  document.getElementById("name").value = item.name;
  document.getElementById("price").value = item.price;

  document.querySelector("#itemForm button").innerText = "Update Item";
  editingIndex = index;
}

function searchItem() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const itemTable = document.getElementById("itemTable");
  let body = `<tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
              </tr>`;

  items.forEach((item, index) => {
    if (item.name.toLowerCase().includes(searchInput)) {
      body += `<tr>
        <td>${item.itemno}</td>
         <td>${item.itemtype}</td>
         <td>${item.name}</td>
         <td>${item.price}</td>
         <td><img src="${item.imageUrl}" alt="${item.name}" class="item-image"></td>
         <td class="actions">
             <button onclick="editItem(${index})" class="button">Edit</button>
             <button onclick="deleteItem(${index})" class="button">Delete</button>
         </td>
     </tr>
     `;
    }
  });

  itemTable.innerHTML = body;
}
