🛍️E-Com Cart — Full Stack Shopping Cart App

A modern full-stack e-commerce.
It demonstrates an end-to-end shopping experience — from browsing products to cart management and mock checkout — using the **MERN stack** with **Tailwind CSS** for styling.

🚀 Tech Stack
| Layer | Technology |
| Frontend | React (Vite) + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB (Atlas / Local) |
| Validation | Zod |
| UI Enhancements | React Hot Toast, React Router DOM |
| API Client | Axios |

## 📁 Project Structure
mock-ecom-cart/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── lib/
│ ├── server.js
│ ├── .env
│ └── package.json
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ ├── api.js
│ ├── App.jsx
│ └── main.jsx
├── .env
└── package.json

✨ Features Implemented
🖥️ Frontend (React + Tailwind)
- **Product Grid:** Displays product cards with image, name, price, and “Add to Cart”.
- **Cart Page:** Lists cart items, allows quantity update and removal.
- **Checkout Modal:** Captures user name and email.
- **Success Page:** Displays receipt (buyer info, items, total, timestamp).
- **Responsive Design:** Works seamlessly across devices.
- **Toast Notifications:** Real-time success/error feedback.
- **Error Handling:** Axios interceptors with friendly messages.
- **Local Storage:** Persists last receipt for reloads.
- **Routing:** `/`, `/cart`, `/success`, and `404` fallback.

⚙️ Backend (Node + Express + MongoDB)
- **Products API:** `/api/products` — returns 5–10 mock items with `id`, `name`, `price`, and `imageUrl`.
- **Cart API:**  
  - `GET /api/cart` — returns current cart and total  
  - `POST /api/cart` — add/update cart item `{productId, qty}`  
  - `DELETE /api/cart/:id` — remove cart line
- **Checkout API:** `POST /api/checkout` — returns mock receipt `{buyer, items, total, timestamp}`.
- **Zod Validation:** Ensures correct name/email format.
- **Cart Persistence:** Stored in MongoDB for a mock user.
- **Graceful Handling:** Removes invalid product references.

🌐 Local URLs
Service	URL
Backend API	http://localhost:4000
Products	http://localhost:4000/api/products
Cart	http://localhost:4000/api/cart
Checkout	http://localhost:4000/api/checkout
Frontend	http://localhost:5173


💬 Toast Messages
Action	Message
Add to Cart	✅ Added to cart
Update Qty	🔄 Quantity updated
Remove Item	❌ Removed from cart
Checkout	💳 Payment successful
Error	⚠️ Something went wrong

🧪 Testing Flow
Start both backend and frontend servers.
Visit frontend → add items to cart.
Update quantity or remove to test cart logic.
Click Checkout, fill name & email, click Pay (Mock).
Confirm receipt on the success page.
Refresh to verify receipt persistence in localStorage.

📸Screenshots
<img width="1347" height="513" alt="Screenshot 2025-10-30 023157" src="https://github.com/user-attachments/assets/4bd72395-4605-4bab-9300-4b5eefd9e062" />
<img width="1347" height="513" alt="Screenshot 2025-10-30 023157" src="https://github.com/user-attachments/assets/533fa47d-4faf-4321-809a-40296561ca61" />
<img width="1359" height="631" alt="Screenshot 2025-10-30 023212" src="https://github.com/user-attachments/assets/1973c184-2b0a-4630-9080-33d5e8f9ec50" />
<img width="1357" height="623" alt="Screenshot 2025-10-30 023231" src="https://github.com/user-attachments/assets/1599cbcc-b200-4c40-84cb-b8bd002c5a7a" />
<img width="1360" height="621" alt="Screenshot 2025-10-30 023258" src="https://github.com/user-attachments/assets/9475a09a-94bf-49c3-8450-06a072e3e5ac" />
<img width="1133" height="294" alt="Screenshot 2025-10-30 004032" src="https://github.com/user-attachments/assets/6706f2a9-b1eb-4b05-80bf-14035f6755d9" />


