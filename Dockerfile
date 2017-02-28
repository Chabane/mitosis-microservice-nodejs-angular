FROM nginx:1.11

# Copy built app to wwwroot
COPY dist /usr/share/nginx/html
