# PeerProducts 🛍️

**PeerProducts** is a modern, premium product recommendation social network where people discover and share genuine, peer-to-peer product recommendations.

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
# Database Connection (PostgreSQL / Neon)
DATABASE_URL="postgresql://..."

# Auth.js Config
AUTH_SECRET="your-auth-secret"
AUTH_TRUST_HOST=true
GOOGLE_CLIENT_ID="google-client-id"
GOOGLE_CLIENT_SECRET="google-client-secret"

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---

## 🚀 How to Run

### Method 1: Using Docker (Recommended)

Run the application using the pre-built image from Docker Hub (automatically pulls and handles migrations):

```bash
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

### Method 2: Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Sync the database schema:**
   ```bash
   npx prisma db push
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🤖 GitHub Actions CI/CD

A workflow has been configured in [.github/workflows/docker-publish.yml](file:///d:/peerproducts/.github/workflows/docker-publish.yml) to automatically build and push the Docker image to Docker Hub on every push to the `main` branch.

To enable this, go to your GitHub repository settings and add the following **Repository Secrets** under **Settings > Secrets and variables > Actions**:

* `DOCKERHUB_USERNAME`: Your Docker Hub username (e.g., `gouravsaha`).
* `DOCKERHUB_TOKEN`: A Personal Access Token generated from Docker Hub (**Account Settings > Security > Personal access tokens**).
