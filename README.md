# EduCore

## Tech stack

- **Backend:** C# .NET 9, ASP.NET Core API, Entity Framework Core, JWT Authentication
- **Database:** MS SQL Server 2022 (containerized)
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Infrastructure:** Docker & Docker Compose

---

## First-time setup

**1. Set up Environment Variables**
- Never commit passwords to Git.
- Copy the `.env.example` file in the root directory and rename it to `.env`.
- Open `.env` and set your local database password:
``` env
DB_PASSWORD=ExtremelyStrongPassword123!
```

**2. Set up the Local API Connection String**
- The file `appsettings.Development.json` is ignored by Git to prevent secret leaks. You must create it manually on your machine.
- Create a file at `backend/src/EduCore.Api/appsettings.Development.json`.
- Paste the following JSON, replacing `YOUR_PASSWORD` with the password from your `.env` file:
``` json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=EduCoreDb;User Id=sa;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
  }
}
```
---

## Development workflow

Do not run `docker-compose up --build` for the development workflow. Instead, run the database in Docker, and run the code locally for instant Hot-Reload.

### Step 1: Start the Database

Open a terminal at the project root and run the DB in the background:
``` bash
docker-compose up db -d
```

### Step 2: Start the Backend API

- **Terminal & Neovim / Vim:**
``` bash
cd backend/src/EduCore.Api
dotnet watch
```

- **Visual Studio:**
  1. Open `backend/EduCore.sln`.
  1. In the top toolbar, change the run profile to `http`.
  1. Press `F5` to start debugging.

- **Visual Studio Code:**
  1. Install the **"C# Dev Kit"** extension.
  1. Open the `backend/` folder in VS Code.
  1. Open the Solution Explorer pane, right-click `EduCore.Api` -> Debug -> Start New Instance.

_The API will be available at <http://localhost:5000/swagger>_

### Step 3: Start the Frontend UI

- **VS Code:** Install the **"Live Server"** extension. Right-click `frontend/index.html` -> "Open with Live Server".
- **Terminal (Python):** 
``` bash
cd frontend
python -m http.server 3000
```

_The UI will be available at <http://localhost:3000>_

---

## Full Docker execution (production / CI testing)

To test how the entire application runs together inside isolated containers (e.g., before merging a Pull Request):
``` bash
docker-compose up --build
```

- **Frontend UI:** <http://localhost:3000>
- **Backend Swagger:** <http://localhost:5000/swagger>
- **Database:** `localhost:1433` (Login: `sa`, Password: from `.env`, set Trust Server Certificate: True)

---

## Git workflow

Follow a feature-branch workflow. **Do not push directly to main.**

1. Create a new branch for your task: `git checkout -b feature/short-description`
1. Write your code and commit: `git commit -m "added new endpoint"`
1. Push your branch: `git push origin feature/short-description`
1. Open a Pull Request on GitHub/GitLab to merge into `main`.
