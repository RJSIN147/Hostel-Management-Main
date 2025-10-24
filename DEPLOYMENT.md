# Hostel Management System - Deployment Guide

This guide will walk you through deploying your MERN stack Hostel Management System with the frontend on Vercel and backend on Render.

## Prerequisites

- GitHub account
- Vercel account
- Render account
- MongoDB Atlas account (for database)
- Node.js installed locally

## Project Structure Overview

```
Hostel-Management/
├── frontend/          # React frontend (deploy to Vercel)
├── server/           # Express backend (deploy to Render)
├── package.json      # Root package.json
└── Procfile          # For Heroku (if needed)
```

## Part 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

### 1.2 Configure Database
1. Create a database user:
   - Go to Database Access → Add New User
   - Create username and password (save these credentials)
   - Set privileges to "Read and write to any database"

2. Whitelist IP addresses:
   - Go to Network Access → Add IP Address
   - Add `0.0.0.0/0` to allow access from anywhere (for production)

3. Get connection string:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `hostel-management`)

## Part 2: Backend Deployment (Render)

### 2.1 Prepare Backend for Deployment

The backend is already configured with:
- ✅ CORS support added
- ✅ Environment variables setup
- ✅ Production build configuration
- ✅ Error handling middleware
- ✅ **Separate package.json created in server folder** for Render deployment

### 2.2 Deploy to Render

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin master
   ```

2. **Create Render Service**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Render Service**:
   - **Name**: `hostel-management-api` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server` (important!)
   - **Node Version**: `18.x` (or latest)

4. **Set Environment Variables** in Render:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-management?retryWrites=true&w=majority
   JWT_SECRET=your_very_secure_jwt_secret_key_here
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL (e.g., `https://hostel-management-api.onrender.com`)

## Part 3: Frontend Deployment (Vercel)

### 3.1 Prepare Frontend for Deployment

The frontend is already configured for production deployment:

✅ **API Configuration**:
- Created `frontend/src/config/api.js` for environment-based API URLs
- Created `frontend/src/config/axios.js` with axios instance and interceptors
- Updated all action files to use the new axios instance
- Automatic token handling and error management

✅ **Production Ready**:
- All API calls now use the full backend URL in production
- Automatic authentication token handling
- Proper error handling for expired tokens

### 3.2 Deploy to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `frontend`
   - Set **Build Command** to `npm run build`
   - Set **Output Directory** to `build`

3. **Set Environment Variables** in Vercel:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note the frontend URL (e.g., `https://hostel-management.vercel.app`)

### 3.3 Update Backend CORS (if needed)

After getting your frontend URL, update the backend environment variable:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

Then redeploy the backend on Render.

## Part 4: Final Configuration

### 4.1 Update Environment Variables

**Backend (Render)**:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-management?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_jwt_secret_key_here
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Frontend (Vercel)**:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### 4.2 Test Your Deployment

1. **Test Backend**:
   - Visit `https://your-backend-url.onrender.com`
   - Should see "API is running...."

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try logging in/registering
   - Test all functionality

## Part 5: Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check that the frontend URL matches exactly

2. **Database Connection Issues**:
   - Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
   - Check connection string format
   - Ensure database user has correct permissions

3. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility
   - Check build logs for specific errors

4. **API Calls Failing**:
   - Verify `REACT_APP_API_URL` is set correctly
   - Check network tab in browser dev tools
   - Ensure backend is running and accessible

### Useful Commands:

```bash
# Install dependencies
npm install

# Run locally (development)
npm run dev

# Build frontend
cd frontend && npm run build

# Test backend locally
npm start
```

## Part 6: Production Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with proper permissions
- [ ] IP addresses whitelisted in MongoDB Atlas
- [ ] Backend deployed to Render with correct environment variables
- [ ] Frontend deployed to Vercel with correct environment variables
- [ ] CORS configured properly
- [ ] All API endpoints tested
- [ ] Authentication flow tested
- [ ] Database operations tested

## Part 7: Monitoring and Maintenance

### Render (Backend):
- Monitor service health in Render dashboard
- Check logs for errors
- Set up alerts for downtime

### Vercel (Frontend):
- Monitor deployment status
- Check build logs
- Set up custom domain if needed

### MongoDB Atlas:
- Monitor database performance
- Set up alerts for connection issues
- Regular backups (automatic with Atlas)

## Support

If you encounter issues:
1. Check the deployment logs in both Render and Vercel
2. Verify all environment variables are set correctly
3. Test API endpoints directly using tools like Postman
4. Check browser console for frontend errors
5. Review MongoDB Atlas logs for database issues

---

**Note**: This deployment setup uses free tiers where possible. For production applications with high traffic, consider upgrading to paid plans for better performance and reliability.
