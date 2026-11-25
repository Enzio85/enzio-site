# Pikaiou Cards

Boutique de cartes illustrées en HTML, CSS et JavaScript.

## Aperçu local

Ouvrez `index.html` dans un navigateur.

## Activer les paiements Stripe

1. Créez un compte Stripe et complétez la vérification de votre entreprise.
2. Dans Stripe, créez un **Payment Link** ou un produit pour chaque carte.
3. Dans `script.js`, remplacez `const STRIPE_PAYMENT_LINK = "";` par votre lien Stripe, par exemple :

```js
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/votre-lien";
```

4. Validez le lien sur GitHub Pages.

Stripe verse les paiements sur le compte bancaire relié à votre espace Stripe, pas directement sur une carte bancaire. Ce dépôt ne contient aucun secret Stripe.
