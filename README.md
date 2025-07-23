# 📚 Nova

**Nova** is a full-stack web banking application Built with React, Tailwind CSS, and ASP.NET Core Web API.

---

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** ASP.NET Core 8 + EF Core + JWT Authentication
- **Database:** SQL Server
- **Deployment:** Vercel (frontend), Azure App Service (backend)

---

## Live Demo

- **Frontend:** [https://nova-origin.vercel.app/](https://nova-origin.vercel.app/)
- **Backend:** [https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/](https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abdellah-saim-mamoune1/Nova_Bank
cd Nova
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
 User login & JWT authentication

 Managing clients, employees, money transfers, Deposits/Withdrawls

 Role-based access (admin, client)

 Responsive UI with Tailwind

---

 ## Notes
 you can log in as a client using this account: A8UKS91R3D; password: 1234567
 
 you can log in as an admin using this account: halim.yamin@Nova.com; password: 1234567
 
---

 ## Contributions
 Contributions are welcomed.
 
---

 ## Contact
 If you have any questions or suggestions, reach out at: abdellahsaimmamoune1@gmail.com.
 




