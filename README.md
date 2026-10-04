# HomeBites

A full-stack food delivery application built with the MERN stack — browse a menu
by category, customise items by size and quantity, manage a cart, and review
your order history.

**Live demo:** https://food-delivery-avtpgvkgw-23je0423-1123s-projects.vercel.app/
**API:** https://fooddelivery-9zkd.onrender.com

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, React Router 7, Bootstrap 5.3, Bootstrap Dark 5, MUI 7 |
| Backend | Node.js, Express 5, Mongoose 8 |
| Database | MongoDB (Atlas) |
| Auth | JWT + bcrypt |
| Build | Create React App (`react-scripts` 5) |

Requires **Node.js 20 or newer** (see `.nvmrc`).

---

## Features

- **Authentication** — registration and login with bcrypt password hashing and
  JWT issuance. Credentials are validated server-side with `express-validator`.
- **Menu browsing** — items grouped into categories (Burgers, Pizza, Desserts,
  Indian, Beverages), each item priced by size.
- **Live search** — filter the menu by name as you type.
- **Customisation** — pick a quantity (1–6) and a size option per item; the
  price updates live.
- **Cart** — add items, remove them, see a running total. Adding the same item
  and size again merges into the existing line instead of duplicating it.
- **Cart badge** — the navbar shows the current item count.
- **Modal cart** — the cart opens in a portal-based modal overlay.
- **Checkout** — records the order against your account.
- **Order history** — every past order, newest first, with date, quantity,
  size, and line total.
- **Dark theme** — Bootstrap Dark 5, loaded via CDN.

---

## Project structure

```
.
├── backend/
│   ├── index.js              # Express app, port from env
│   ├── db.js                 # MongoDB connection + menu cache
│   ├── seed.js               # Populates foodCategory + food_items
│   ├── .env.example          # Required environment variables
│   ├── models/
│   │   ├── User.js           # name, email, password, location, date
│   │   └── Orders.js         # email, order_data[]
│   └── Routes/
│       ├── CreateUser.js     # /api/createuser, /api/loginuser
│       ├── DisplayData.js    # /api/foodData
│       └── OrderData.js      # /api/orderData, /api/myorderData
├── public/
│   └── index.html            # Includes the dark-theme CDN stylesheet
├── src/
│   ├── api.js                # API base URL + fetch helper
│   ├── App.js                # Routes
│   ├── Modal.js              # Portal-based modal (renders into #cart-root)
│   ├── components/
│   │   ├── Card.js           # Menu item card
│   │   ├── ContextReducer.js # Cart state (ADD / REMOVE / DROP)
│   │   ├── Footer.js
│   │   └── Navbar.js         # Nav, cart badge, login state
│   └── screens/
│       ├── Home.js           # Menu + carousel + search
│       ├── Login.js
│       ├── Signup.js
│       ├── Cart.js
│       └── MyOrder.js
├── .nvmrc
├── vercel.json               # SPA rewrites for client-side routing
└── package.json
```

---

## Getting started

### 1. Prerequisites

- Node.js 20+ (`nvm use` reads `.nvmrc`)
- A MongoDB Atlas account

### 2. Get a MongoDB Atlas connection string

1. Create a free **M0** cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Under **Database Access**, create a user with *Read and write to any database*.
3. Under **Network Access**, allow `0.0.0.0/0` — required because Render's free
   tier has no fixed outbound IP.
4. Copy the connection string and add your database name.

### 3. Configure the backend

```bash
cd backend
npm install
cp .env.example .env
```

On Windows PowerShell, copy the template with:

```powershell
Copy-Item .env.example .env
```

Then fill in `backend/.env`:

```env
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/homebites
JWT_SECRET=<a 64-character random hex string>
```

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Seed the database

The app reads the `foodCategory` and `food_items` collections on startup, so an
empty database renders a blank menu.

```bash
npm run seed
```

This inserts 5 categories and 20 items. It refuses to overwrite existing data
unless you pass `--force`:

```bash
npm run seed -- --force
```

### 5. Run both servers

Backend, on port 4000:

```bash
cd backend
npm run dev
```

Frontend, on port 3000, in a second terminal:

```bash
npm install
npm start
```

Open <http://localhost:3000>.

---

## Environment variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | yes | MongoDB connection string. The server exits immediately if unset. |
| `JWT_SECRET` | yes | Secret used to sign JWTs. |
| `PORT` | no | Defaults to `4000`. Render sets this automatically. |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `REACT_APP_API_URL` | in production | API base URL, e.g. `https://your-api.onrender.com`. Defaults to `http://localhost:4000` for local development. |

All frontend API calls go through `src/api.js`, which reads this one variable —
no URLs are hardcoded in components.

---

## API reference

Every endpoint uses `POST`. Requests and responses are JSON.

| Endpoint | Purpose | Body |
| --- | --- | --- |
| `/api/createuser` | Register a user | `{ name, email, password, location }` |
| `/api/loginuser` | Log in | `{ email, password }` |
| `/api/foodData` | Fetch the menu | *(none)* |
| `/api/orderData` | Save an order | `{ order_data, email, order_date }` |
| `/api/myorderData` | Fetch order history | `{ email }` |

`/api/foodData` responds with `[foodItems, foodCategories]`.

---

## Deployment

The frontend and backend deploy as separate services.

### Backend — Render

| Setting | Value |
| --- | --- |
| Root directory | `backend` |
| Build command | `npm install` |
| Start command | `npm start` |
| Environment | `MONGO_URI`, `JWT_SECRET` |

On the free tier the service spins down after roughly 15 minutes of inactivity,
so the first request after a pause takes about 30–50 seconds to respond.

### Frontend — Vercel

| Setting | Value |
| --- | --- |
| Root directory | repository root |
| Build command | `npm run build` |
| Output directory | `build` |
| Environment | `REACT_APP_API_URL=https://your-api.onrender.com` |

`vercel.json` rewrites all paths to `index.html` so client-side routes like
`/myOrder` survive a hard refresh.

> **Note:** Vercel sets `CI=true`, which makes Create React App treat ESLint
> warnings as build errors. Run `CI=true npm run build` locally before pushing
> to catch these.

---

## Known limitations and security notes

This section documents issues present in the current build. They are listed
deliberately rather than hidden — treat this deployment as a demo, not a
production system.

- **No server-side JWT verification.** A token is signed at login but never
  validated by the API. `/api/orderData` and `/api/myorderData` accept whatever
  email the client sends, so anyone who knows an address can read or modify that
  person's orders. The navbar hides the My Orders link using `localStorage`, but
  that is a UI convenience, not a security control. Fixing this requires a
  verification middleware on both order routes.
- **Cart quantity math is wrong.** In `ContextReducer.js`, re-adding an item
  already in the cart runs `qty += qty / 2`. Adding the same item and size twice
  gives a quantity of `1.5`, then `2.25`. It should be `existing.qty +
  incoming.qty`.
- **The cart is not persisted.** It lives in React state, so a page refresh
  empties it.
- **CORS is fully open.** `app.use(cors())` allows any origin.
- **No address is collected at checkout.** Signup accepts a manually typed
  address, but the geolocation button was removed as dead code — it targeted an
  API route that does not exist.
- **No payment integration.** Checkout only writes a record to MongoDB.
- **Seed images are placeholders.** Item photos use `placehold.co`; the original
  image URLs were not recoverable.

---

## Troubleshooting

**The menu is empty.** The `foodCategory` and `food_items` collections are
missing or empty. Run `npm run seed`.

**`Error: MONGO_URI is not set`.** `backend/.env` is missing or lacks that key.
Copy `.env.example` to `.env` and fill it in. Start the backend with
`npm run dev`, which passes `--env-file=.env`; `npm start` does not, and
expects the variables to be set in the environment already.

**The Vercel build fails with a lint error.** Vercel sets `CI=true`, which
promotes ESLint warnings to errors. Reproduce locally with `CI=true npm run
build`.

**"Failed to fetch" in the browser.** The frontend cannot reach the API. In
local development, confirm the backend is running on port 4000. In production,
check that `REACT_APP_API_URL` is set and points at the live backend.

**`autoprefixer: Replace color-adjust to print-color-adjust`.** Emitted by
Bootstrap's stylesheet. The dark theme is loaded from a CDN in
`public/index.html` rather than imported through the build, which keeps this
warning out of the compilation step.

---

## License

MIT