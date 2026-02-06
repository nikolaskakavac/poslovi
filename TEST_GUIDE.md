# 🚀 Jobzee - Test i Razvoj

## ⚡ Brz Start (2 minuta)

### 1️⃣ PostgreSQL (obrizavaj ako je već instaliran)

```bash
# Windows - Services
services.msc → postgresql-x64-15 → Start

# Ili Docker
docker run -e POSTGRES_PASSWORD=LOZINKA123 -p 5432:5432 -d postgres:15
```

### 2️⃣ Backend (Terminal 1)

```bash
cd backend
npm start
```

Trebalo bi videti:
```
✅ Baza je sinhronizovana!
🌱 Počinjem seed-ovanje baze...
✅ Baza je seed-ovana sa test podacima!
✅ Backend server pokrenut na http://localhost:5000
```

### 3️⃣ Frontend (Terminal 2)

```bash
npm run dev
```

Trebalo bi videti:
```
Local: http://localhost:5173/
```

---

## 📝 Test Kredencijali

Backend **automatski** dodaje test korisnike pri pokretanju:

### Student
```
Email: student@test.com
Lozinka: TEST123
```

### Kompanija
```
Email: company@test.com
Lozinka: TEST123
```

### Alumni
```
Email: alumni@test.com
Lozinka: TEST123
```

---

## 🧪 Šta Je Automatski Dodano

Kada se backend pokrene prvi put, baza će biti seed-ovana sa:

### Korisnici (3)
- ✅ Student
- ✅ Kompanija  
- ✅ Alumni

### Kompanije (2)
- ✅ TechCorp Serbia
- ✅ Globex Solutions

### Oglasi (5)
- ✅ Junior Frontend Developer
- ✅ Mid-level Backend Developer
- ✅ Full Stack Developer
- ✅ Praktikant - Frontend
- ✅ Senior Developer

---

## ✅ Šta Sve Možeš Testirati

### Kao Student

1. Otvori `http://localhost:5173/jobs`
   - Trebalo bi videti 5 test oglasa
   - Testiraj filtere (lokacija, tip, kategorija)

2. Prijavi se sa student@test.com
   - Aplikacija je sprema za prijavu

3. Ostavi recenziju kompanije

### Kao Kompanija

1. Prijavi se sa company@test.com

2. Klikni "Postavi oglas"
   - Trebalo bi videti formu (ne prijava!)
   - Postavi novi oglas

3. Otvori Admin Konsolu
   - `http://localhost:5173/admin-console`
   - Vidim sve korisnike i oglase

### Kao Svako

1. Otvori Debug stranicu
   - `http://localhost:5173/debug`
   - Testiraj sve API endpoint-e

2. Otvori Kompanije stranicu
   - `http://localhost:5173/kompanije`
   - Vidim sve kompanije

---

## 🐛 Ako Nešto Ne Radi

### Problem: "Nema oglasa na /jobs"

**Rešenje:**
1. Proveri da je backend pokrenut - trebalo bi videti "seed-ovana sa test podacima"
2. Otvori Debug stranicu pa testiraj `/jobs` endpoint
3. Ako i dalje ne radi, restart backend (`npm start`)

### Problem: "Postavi oglas iskoci prijava"

**Rešenje:**
1. Prijavi se prvo
2. Onda klikni "Postavi oglas"
3. Trebalo bi videti formu, ne modal

### Problem: "PostgreSQL nije dostupna"

**Rešenje:**
1. Pokreni PostgreSQL servis
   ```bash
   services.msc → postgresql → Start
   ```
2. Ili koristi Docker:
   ```bash
   docker run -e POSTGRES_PASSWORD=LOZINKA123 -p 5432:5432 -d postgres:15
   ```
3. Restart backend

### Problem: "Port 5000 je već u upotrebi"

**Rešenje:**
```bash
# Zaustavi proces na portu 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Ili promeni port u backend/.env
PORT=5001
```

---

## 📊 API Endpoints Za Testiranje

### Oglasi (svi dostupni bez prijave)
```
GET /api/jobs
GET /api/jobs/1
GET /api/jobs?search=developer
GET /api/jobs?location=Beograd
GET /api/jobs?category=IT
```

### Auth
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Kompanije
```
GET /api/companies
GET /api/companies/1
PUT /api/companies/1 (auth)
```

### Primene (auth required)
```
GET /api/applications
POST /api/applications/apply/1
```

### Health Check
```
GET /api/health
```

**Debuguj na:** `http://localhost:5173/debug`

---

## 📚 Fajlovi Za Pregled

Ako želiš da razumeš kako radi:

- **Frontend modeli**: `src/models/GUIDE.js`
- **Backend kontroleri**: `backend/controllers/index.js`
- **Database schema**: `backend/migrations/SCHEMA.js`
- **API struktura**: `MASTER_ARCHITECTURE.js`

---

## 🎯 Sledeći Koraci

1. ✅ **Testiraj aplikaciju** sa test podacima
2. ✅ **Registruj nove korisnike** ako želiš
3. ✅ **Postavi nove oglase** i testiraj sve funkcije
4. ✅ **Prikaži `/debug`** stranicu ako nešto ne radi
5. ✅ **Čitaj kod** u `src/` i `backend/` direktorijumima

---

**Svih je spremo za development i testiranje!** 🎉

Kontakt korisničke podrške: Pogledaj `MASTER_ARCHITECTURE.js` za detaljan pregled.
