# Node.js, PM2, and Apache Installation on RHEL

This guide provides step-by-step instructions for installing **Node.js**, **PM2**, and **Apache HTTP Server** on a **Red Hat Enterprise Linux (RHEL)** system.

---

## Prerequisites

- RHEL-based server (RHEL 8/9)
- `sudo` or root access
- Internet connectivity

---

## 1. Install Node.js

### Add NodeSource Repository
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
```

### Install Node.js
```bash
sudo dnf install -y nodejs
```

### Verify Installation
```bash
node -v
npm -v
```

---

## 2. Install PM2

### Install PM2 globally
```bash
sudo npm install -g pm2
```

### Verify Installation
```bash
pm2 -v
```

### Setup PM2 Startup Script
```bash
pm2 startup
# Copy and run the command displayed in the output
```

### Start and Save Your App
```bash
pm2 start app.js --name "my-app"
pm2 save
```

---

## 3. Install Apache HTTP Server

### Install Apache
```bash
sudo dnf install -y httpd
```

### Enable and Start Apache
```bash
sudo systemctl enable httpd
sudo systemctl start httpd
```

### Verify Apache is Running
```bash
sudo systemctl status httpd
```

---

## 4. Configure Apache as a Reverse Proxy (Optional)

### Install Required Modules
```bash
sudo dnf install -y mod_proxy mod_proxy_http
```

### Create a Virtual Host Configuration
Create a file at `/etc/httpd/conf.d/myapp.conf`:
```apache
<VirtualHost *:80>
    ServerName yourdomain.com

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    ErrorLog /var/log/httpd/myapp-error.log
    CustomLog /var/log/httpd/myapp-access.log combined
</VirtualHost>
```

### Restart Apache
```bash
sudo systemctl restart httpd
```

---

## 5. Configure Firewall

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

---

## 6. SELinux (Optional)

If SELinux is enforcing and causes network access issues:
```bash
sudo setsebool -P httpd_can_network_connect 1
```

---

## License

MIT
