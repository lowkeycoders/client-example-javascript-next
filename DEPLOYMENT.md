# Deployment Guide

## Environment Configuration

This application uses a single environment variable to configure the base path when deployed under a subpath. Follow these steps to configure your deployment:

### 1. Set Environment Variables

Create a `.env.production` file in the root of your project with the following content:

```
NEXT_PUBLIC_BASE_PATH=/onsurity
```

You can change `/onsurity` to any other path as needed for future deployments.

### 2. Build the Application

```bash
npm run build
```

### 3. Start the Application

```bash
npm start
```

## Nginx Configuration

Ensure your Nginx configuration includes the proper rewrite rule:

```nginx
location /onsurity/ {
    rewrite ^/onsurity(/.*)$ $1 break;
    proxy_pass http://localhost:3200;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

If you change the base path from `/onsurity` to something else, make sure to update both:

1. The `NEXT_PUBLIC_BASE_PATH` environment variable
2. The Nginx location and rewrite rule

## Troubleshooting

If assets are not loading correctly:

1. Check browser console for 404 errors
2. Verify that the `NEXT_PUBLIC_BASE_PATH` is set correctly
3. Confirm that the Nginx rewrite rule is working properly
4. Restart both Nginx and your Next.js application after making changes
