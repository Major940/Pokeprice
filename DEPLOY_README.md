# PokéPrice eBay - Vérificateur de Prix Cartes Pokémon

Application web pour vérifier les prix des cartes Pokémon sur eBay.fr en temps réel.

## 🚀 Déploiement sur Vercel

### Étape 1 : Préparer les fichiers

Tous les fichiers nécessaires sont prêts :
- `public/index.html` - Frontend de l'application
- `api/search.js` - API serverless qui appelle eBay
- `package.json` - Configuration Node.js
- `vercel.json` - Configuration Vercel

### Étape 2 : Créer un compte Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Clique sur "Sign Up"
3. Connecte-toi avec GitHub (ou email)

### Étape 3 : Déployer

**Option A - Via GitHub (Recommandé)**

1. Crée un nouveau dépôt GitHub
2. Upload tous les fichiers de ce dossier
3. Sur Vercel, clique "New Project"
4. Importe ton dépôt GitHub
5. Clique "Deploy"

**Option B - Via CLI Vercel**

```bash
npm install -g vercel
cd /path/to/pokeprice-ebay
vercel
```

**Option C - Glisser-Déposer**

1. Zip tous les fichiers de ce dossier
2. Sur Vercel, va dans Dashboard
3. Glisse le fichier ZIP dans la zone de dépôt

### Étape 4 : Utiliser l'application

Une fois déployé, Vercel te donnera une URL comme :
```
https://pokeprice-ebay.vercel.app
```

Ouvre cette URL sur ton téléphone et tu pourras chercher des cartes !

## 📱 Utilisation

1. Entre le nom d'une carte Pokémon
2. Clique sur "Rechercher"
3. Vois les prix en temps réel depuis eBay.fr

## 🔧 Configuration

Le token eBay OAuth est déjà configuré dans `api/search.js`.
Il expire le 25 juillet 2027.

Pour le renouveler :
1. Va sur developer.ebay.com
2. Génère un nouveau token
3. Remplace le token dans `api/search.js` ligne 19

## ✨ Fonctionnalités

- ✅ Recherche en temps réel sur eBay.fr
- ✅ Prix moyen, min, max, médiane
- ✅ Images des cartes
- ✅ Liens directs vers les annonces
- ✅ Interface mobile-friendly
- ✅ Aucune limite de requêtes

## 📦 Structure

```
pokeprice-ebay/
├── public/
│   └── index.html          # Frontend
├── api/
│   └── search.js          # Backend API
├── package.json           # Config Node
├── vercel.json           # Config Vercel
└── README.md            # Ce fichier
```

## 🎯 Technologies

- Frontend : HTML, CSS, JavaScript vanilla
- Backend : Node.js (Vercel Serverless Functions)
- API : eBay Browse API
- Hébergement : Vercel (gratuit)

---

Créé avec ⚡ pour chercher des cartes Pokémon !
