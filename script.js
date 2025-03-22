document.addEventListener("DOMContentLoaded", function () {
    let loggedInSeller = localStorage.getItem("loggedInSeller");

    if (loggedInSeller) {
        if (window.location.pathname.includes("index.html")) {
            window.location.href = "home.html";
        }
    } else if (!window.location.pathname.includes("index.html")) {
        window.location.href = "index.html";
    }
});

// 📌 Login Function
function login() {
    let email = document.getElementById("email").value;

    if (email.endsWith("@cec.edu")) {  // Ensure only college emails can log in
        localStorage.setItem("loggedInSeller", email);
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Use your college email to log in.");
    }
}

// 📌 Logout Function
function logout() {
    localStorage.removeItem("loggedInSeller");
    window.location.href = "index.html";
}

// 📌 Handle Selling Items (Now with Image Support)
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("sell-form")) {
        document.getElementById("sell-form").addEventListener("submit", function (e) {
            e.preventDefault();

            let loggedInSeller = localStorage.getItem("loggedInSeller");
            if (!loggedInSeller) {
                alert("Please log in to sell an item.");
                return;
            }

            let sellerName = document.getElementById("seller-name").value;
            let sellerContact = document.getElementById("seller-contact").value;
            let itemName = document.getElementById("item-name").value;
            let itemPrice = document.getElementById("item-price").value;
            let itemImageInput = document.getElementById("item-image").files[0];

            if (!itemImageInput) {
                alert("Please upload an image.");
                return;
            }

            let reader = new FileReader();
            reader.onload = function (event) {
                let itemImage = event.target.result; // Convert image to Base64

                let items = JSON.parse(localStorage.getItem("items")) || [];
                items.push({
                    sellerEmail: loggedInSeller,
                    sellerName: sellerName,
                    sellerContact: sellerContact,
                    name: itemName,
                    price: itemPrice,
                    image: itemImage // Store Base64 image
                });

                localStorage.setItem("items", JSON.stringify(items));

                alert("Item added successfully!");
                window.location.href = "home.html";
            };

            reader.readAsDataURL(itemImageInput);
        });
    }

    // 📌 Load Items into Buy Page (Now Displays Images)
    if (document.getElementById("items-container")) {
        let container = document.getElementById("items-container");
        let items = JSON.parse(localStorage.getItem("items")) || [];
        let loggedInSeller = localStorage.getItem("loggedInSeller");

        container.innerHTML = ""; // Clear existing items

        items.forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("item");

            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <p><strong>${item.name}</strong></p>
                <p>Price: ₹${item.price}</p>
                <button onclick="showSellerInfo(${index})">View Seller</button>
                ${loggedInSeller === item.sellerEmail ? `<button onclick="deleteItem(${index})">Delete</button>` : ""}
            `;

            container.appendChild(div);
        });
    }
});

// 📌 Show Seller Info
function showSellerInfo(index) {
    let items = JSON.parse(localStorage.getItem("items"));
    let item = items[index];

    alert(`Seller: ${item.sellerName}\nContact: ${item.sellerContact}\nEmail: ${item.sellerEmail}`);
}

// 📌 Delete Item (Only if Seller Matches)
function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem("items"));
    let loggedInSeller = localStorage.getItem("loggedInSeller");

    if (items[index].sellerEmail === loggedInSeller) {
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        alert("Item deleted successfully!");
        location.reload();
    } else {
        alert("You can only delete items you have added.");
    }
}
// 📌 Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.createElement("div");
    menuIcon.classList.add("menu-icon");
    menuIcon.innerHTML = "☰"; // Hamburger icon

    const nav = document.querySelector("nav");
    const menu = document.querySelector("nav ul");

    menuIcon.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    nav.insertBefore(menuIcon, nav.firstChild);
});
