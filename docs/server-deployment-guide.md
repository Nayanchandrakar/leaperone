# Server deployment guide

A step-by-step guide to running the Leaperone API server on a single EC2 instance using Docker Compose, with Caddy in front as a reverse proxy that handles TLS certificates automatically.

## 1. Install Docker and the Compose plugin

Run the following on the EC2 instance.

### Docker Engine (Amazon Linux 2023)

```bash
sudo dnf install -y docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER && newgrp docker
```

> **Note:** `systemctl enable docker` matters — `restart: unless-stopped` on the containers only brings them back after a reboot if the daemon itself starts at boot.



### Compose v2 plugin

Amazon Linux ships the Engine only, so add the Compose v2 plugin:

```bash
sudo mkdir -p /usr/libexec/docker/cli-plugins
sudo curl -fSL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)" \
  -o /usr/libexec/docker/cli-plugins/docker-compose
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose
```



## 2. Build and publish the server image

Run this from the repository root on your own machine (`<dockerhub-user>` is your Docker Hub account):

```bash
docker build -f docker/server/Dockerfile -t <dockerhub-user>/leaperone-server:latest .
docker push <dockerhub-user>/leaperone-server:latest
```

> **Tip:** Tag releases with a git SHA or version instead of `latest`, so a rollback is a one-line change later.



## 3. Create the deployment files

Create the deployment directory on the EC2 instance:

```bash
sudo mkdir -p /opt/leaperone/conf && sudo chown -R $USER /opt/leaperone
cd /opt/leaperone
```



#### `docker-compose.yaml`

```yaml
services:
  caddy:
    image: caddy:2.11.4
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./conf:/etc/caddy
      - caddy_data:/data
      - caddy_config:/config

  leaperone-server:
    image: <dockerhub-user>/leaperone-server:latest
    restart: unless-stopped
    env_file: .env
    environment:
      NODE_ENV: production
      PORT: 8080
    expose:
      - "8080"

volumes:
  caddy_data:
  caddy_config:
```



### `conf/Caddyfile`

Replace the hostname and email with your own:

```caddyfile
api.example.com {
	encode zstd gzip
	log {
		output stdout
		format console
	}
	reverse_proxy leaperone-server:8080
}
```

`reverse_proxy` targets the Compose service name, and Caddy handles certificates and the HTTP to HTTPS redirect. `caddy_data` persists the issued certificates; `expose` keeps the API off the public internet.

## 4. Configure the environment

```bash
cp apps/server/.env.example .env    # optional: run from a checkout of the repository
chmod 600 .env
nano .env
```

The file expects the following values:

```dotenv
# Environment setting
NODE_ENV=production

# Backend server (Hono.js)
SERVER_URL="http://localhost:8080"

# Frontend app (Next.js)
FRONTEND_URL="http://localhost:3000"

# Database (Neon.tech PostgreSQL)
DATABASE_URL="your_neon_database_url"

# Auth session secret
AUTH_SECRET="your_auth_secret"

# Email API key (Resend)
RESEND_API_KEY="your_resend_api_key"

# Sender email address (Resend)
RESEND_MAIL="your_resend_mail"

# Access key ID (AWS S3)
AWS_ACCESS_KEY_ID="your_aws_access_key_id"

# Secret access key (AWS S3)
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"

# Region (AWS S3)
AWS_REGION="us-east-1"

# Upload bucket name (AWS S3)
S3_UPLOAD_BUCKET="your_s3_upload_bucket"

# Rate limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="http://localhost:8079"

# Rate limiting token (Upstash Redis)
UPSTASH_REDIS_REST_TOKEN="example_token"

# Secret key (Stripe)
STRIPE_SECRET_KEY="your_stripe_secret_key"

# Webhook signing secret (Stripe)
STRIPE_WEBHOOK="your_stripe_webhook_secret"

# Annual plan price ID (Stripe)
STRIPE_ANNUAL_PRICE_ID="your_stripe_annual_price_id"

# Monthly plan price ID (Stripe)
STRIPE_MONTHLY_PRICE_ID="your_stripe_monthly_price_id"

# Log level (Pino)
LOG_LEVEL="info"
```

> **Note:** `FRONTEND_URL` is the only origin allowed by CORS and CSRF; a mismatch shows up as CORS failures and rejected writes. Replace the `localhost` defaults and placeholders with production values — including the Neon database URL and the Upstash REST URL/token — before starting.



## 5. Start and verify

```bash
docker compose up -d
docker compose ps
```

Both services should report `Up`. Once Caddy logs `certificate obtained successfully`, check the API. An authenticated route answers `401` without a session cookie:

```bash
curl -i https://api.example.com/api/auth/get-session
```



## Updating

Pull and restart the server after publishing a new image:

```bash
docker compose pull leaperone-server && docker compose up -d leaperone-server
```

After editing `.env`, recreate the container so it picks up the change:

```bash
docker compose up -d --force-recreate leaperone-server
```

> **Warning:** Never run `docker compose down -v`; it deletes the certificate volume and re-issuance hits Let's Encrypt rate limits.

