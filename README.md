# The Threefold Chaos

Application mobile-first en dark mode pour le jeu de plateau Codename adapté au domaine du développement web, marketing digital et création.

## 🎮 Fonctionnalités

- **3 niveaux de difficulté** : Junior Dev, Senior Dev, Tech Lead
- **90+ règles aléatoires** (30 par niveau) basées sur le dev web, marketing et création
- **Timer dynamique** : 30-40 secondes par règle avec alerte visuelle (5 dernières secondes en rouge)
- **Interface néon** : Design dark mode avec effets néon cyberpunk
- **Mobile-first** : Optimisé pour smartphone et tablette

## 🚀 Démarrage rapide

### Développement local

```bash
npm install
npm run dev
```

Ouvrez http://localhost:5173

### Déploiement sur VPS avec Docker

#### 1. Sur votre VPS, installez Docker et Docker Compose

```bash
# Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Clonez le repository

```bash
git clone https://github.com/GarRomm/The_Threefold_Chaos.git
cd The_Threefold_Chaos
```

#### 3. Lancez l'application

```bash
docker-compose up -d --build
```

#### 4. Accédez depuis votre mobile/tablette

Ouvrez votre navigateur :
```
http://IP-DE-VOTRE-VPS:3000
```

## 🔧 Configuration

### Changer le port

Modifiez `docker-compose.yml` :
```yaml
ports:
  - "VOTRE_PORT:80"
```

### HTTPS avec Let's Encrypt (recommandé)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

## 📱 PWA - Ajouter à l'écran d'accueil

Sur mobile, ajoutez l'application à votre écran d'accueil pour une expérience type application native.

## 🐳 Commandes Docker utiles

```bash
# Voir les logs
docker-compose logs -f

# Redémarrer
docker-compose restart

# Arrêter
docker-compose down

# Mettre à jour
git pull
docker-compose up -d --build
```

## 🛠 Stack technique

- React 18
- Vite
- Docker + Nginx
- CSS3 (animations néon)

## 📄 License

MIT

