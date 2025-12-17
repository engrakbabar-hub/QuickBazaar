// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdNcqKl5dCXNq-sXcfKZEeEmPT38gMfbI",
  authDomain: "quickbazaar-be247.firebaseapp.com",
  databaseURL: "https://quickbazaar-be247-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quickbazaar-be247",
  storageBucket: "quickbazaar-be247.firebasestorage.app",
  messagingSenderId: "33573620986",
  appId: "1:33573620986:web:a93e326485cb3b5c140d43",
  measurementId: "G-13W7RR5TX5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Load products from Firestore
const productsContainer = document.getElementById('products-container');
db.collection('products').get().then(snapshot => {
  snapshot.forEach(doc => {
    const product = doc.data();
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart('${doc.id}')">Add to Cart</button>
    `;
    productsContainer.appendChild(div);
  });
});

// Add product to cart
function addToCart(productId) {
  const user = auth.currentUser;
  if(!user){
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }
  db.collection('cart').add({
    userId: user.uid,
    productId: productId,
    addedAt: new Date()
  }).then(() => alert('Added to cart!'));
}
