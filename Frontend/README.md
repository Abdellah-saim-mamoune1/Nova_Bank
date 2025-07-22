# 📚 Trezo Books

**Trezo Books** is a full-stack web application for browsing, managing, and purchasing books. Built with React, Tailwind CSS, and ASP.NET Core Web API.

---

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** ASP.NET Core 9 + EF Core + JWT Authentication + Http-Only Cookies
- **Database:** SQL Server
- **Deployment:** Vercel (frontend), Azure App Service (backend)

---

## Live Demo

- **Frontend:** [https://trezo-ruddy.vercel.app/](https://trezo-ruddy.vercel.app/)
- **Backend:** [https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/](https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abdellah-saim-mamoune1/TrezoBooks.git
cd TrezoBooks
```
### 2. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

### 3 .Setup Backend

```bash
cd Backend
dotnet restore
dotnet run
```
#### Update appsettings.json
```bash
{
  "Jwt": {
    "Key": "your-secret-key",
    "Issuer": "your-app",
    "Audience": "your-app",
    "AccessTokenExpirationMinutes": 10,
    "RefreshTokenExpirationDays": 7
  },
  "ConnectionStrings": {
    "DefaultConnection": "your-db-connection-string"
  }
}
```
---

## Features
 User login & JWT authentication with HTTP-only cookies

 Browse books via Google Books API

 Add to cart / manage orders

 Role-based access (admin,seller, user)

 Responsive UI with Tailwind

---

 ## Notes
 JWT tokens are stored in HTTP-only cookies.
 CORS and cookie settings are configured for production with SameSite=Strict.

 ## Contributions
 Contributions are welcomed.

 ## Contact
 If you have any questions or suggestions, reach out at: abdellahsaimmamoune1@gmail.com.
 






