FROM nginx

# Copy built app to wwwroot
COPY dist /usr/share/nginx/html