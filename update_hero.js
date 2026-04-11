const fs = require('fs');

// Update index.html
let html = fs.readFileSync('index.html', 'utf-8');

const heroHtml = `    <!-- ===================== HERO ===================== -->
    <section id="hero" class="hero">
        <div class="hero__overlay"></div>
        <div class="hero__container">
            <div class="hero__content">
                <div class="hero__badge">Location de voitures premium • Marrakech</div>
                <h1 class="hero__title">
                    Location de voitures<br>
                    <span class="text--gradient">de luxe à Marrakech</span>
                </h1>
                <p class="hero__subtitle">
                    Véhicules haut de gamme, service discret et expérience sur mesure<br>
                    pour une clientèle exigeante.
                </p>
                <div class="hero__cta">
                    <a href="#fleet" class="btn btn--primary btn--lg">
                        <span>Découvrir la flotte</span>
                    </a>
                    <a href="https://wa.me/212600000000" class="btn btn--outline-white btn--lg" target="_blank">
                        <span>WhatsApp</span>
                    </a>
                </div>
                <div class="hero__features">
                    <span>Prise en charge gratuite à Casablanca</span>
                    <span>SUV & berlines de prestige</span>
                    <span>Conciergerie 24/7</span>
                </div>
            </div>
        </div>
        
        <!-- Scrolling Ticker -->
        <div class="hero__ticker">
            <div class="ticker__track">
                <span>Rabat</span><span class="dot">•</span>
                <span>Tanger</span><span class="dot">•</span>
                <span>Aéroport</span><span class="dot">•</span>
                <span>SUV de luxe</span><span class="dot">•</span>
                <span>Location longue durée</span><span class="dot">•</span>
                <span>Marrakech</span><span class="dot">•</span>
                <span>Casablanca</span><span class="dot">•</span>
                <span>Agadir</span><span class="dot">•</span>
                <span>Rabat</span><span class="dot">•</span>
                <span>Tanger</span><span class="dot">•</span>
                <span>Aéroport</span><span class="dot">•</span>
                <span>SUV de luxe</span><span class="dot">•</span>
                <span>Location longue durée</span><span class="dot">•</span>
                <span>Marrakech</span><span class="dot">•</span>
                <span>Casablanca</span><span class="dot">•</span>
                <span>Agadir</span>
            </div>
            <div class="ticker__track" aria-hidden="true">
                <span>Rabat</span><span class="dot">•</span>
                <span>Tanger</span><span class="dot">•</span>
                <span>Aéroport</span><span class="dot">•</span>
                <span>SUV de luxe</span><span class="dot">•</span>
                <span>Location longue durée</span><span class="dot">•</span>
                <span>Marrakech</span><span class="dot">•</span>
                <span>Casablanca</span><span class="dot">•</span>
                <span>Agadir</span><span class="dot">•</span>
                <span>Rabat</span><span class="dot">•</span>
                <span>Tanger</span><span class="dot">•</span>
                <span>Aéroport</span><span class="dot">•</span>
                <span>SUV de luxe</span><span class="dot">•</span>
                <span>Location longue durée</span><span class="dot">•</span>
                <span>Marrakech</span><span class="dot">•</span>
                <span>Casablanca</span><span class="dot">•</span>
                <span>Agadir</span>
            </div>
        </div>
    </section>`;

html = html.replace(/<!-- ===================== HERO ===================== -->[\s\S]*?<\/section>/, heroHtml);
fs.writeFileSync('index.html', html, 'utf-8');

// Update style.css
let css = fs.readFileSync('style.css', 'utf-8');

const heroCss = `/* ========================================
   HERO
   ======================================== */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    background: url('https://images.unsplash.com/photo-1627042571714-fe751a02bce0?q=80&w=2000') center/cover no-repeat;
    padding-bottom: 60px;
}

.hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.2) 100%);
    z-index: 1;
}

.hero__container {
    max-width: var(--container);
    margin: 0 auto;
    width: 100%;
    padding: 0 24px;
    position: relative;
    z-index: 2;
}

.hero__content {
    max-width: 750px;
}

.hero__badge {
    display: inline-block;
    padding: 8px 20px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #0a0a0f;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    border-radius: 50px;
    margin-bottom: 24px;
    letter-spacing: 0.5px;
    opacity: 0;
    animation: fadeInUp 0.8s 0.2s var(--ease) forwards;
}

.hero__title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2.8rem, 5.5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    letter-spacing: -1px;
    opacity: 0;
    animation: fadeInUp 0.8s 0.4s var(--ease) forwards;
    color: #ffffff;
}

.hero__title .text--gradient {
    background: none;
    -webkit-text-fill-color: var(--gold);
    color: var(--gold);
}

.hero__subtitle {
    font-size: 1.1rem;
    color: #d1d1d1;
    margin-bottom: 40px;
    line-height: 1.6;
    opacity: 0;
    animation: fadeInUp 0.8s 0.6s var(--ease) forwards;
}

.hero__cta {
    display: flex;
    gap: 16px;
    margin-bottom: 60px;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeInUp 0.8s 0.8s var(--ease) forwards;
}

.hero__features {
    display: flex;
    gap: 25px;
    font-size: 0.85rem;
    color: #cccccc;
    opacity: 0;
    animation: fadeInUp 0.8s 1s var(--ease) forwards;
}

/* Ticker */
.hero__ticker {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(212, 175, 55, 0.2);
    padding: 12px 0;
    display: flex;
    overflow: hidden;
    z-index: 2;
    white-space: nowrap;
}

.ticker__track {
    display: inline-flex;
    align-items: center;
    padding-right: 40px;
    gap: 40px;
    animation: ticker-scroll 35s linear infinite;
}

.ticker__track span {
    font-size: 0.85rem;
    font-weight: 600;
    color: #ffffff;
}

.ticker__track .dot {
    color: var(--gold);
    font-size: 1rem;
}

@keyframes ticker-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
}`;

css = css.replace(/\/\* ========================================\r?\n   HERO\r?\n   ======================================== \*\/[\s\S]*?(?=\/\* ========================================\r?\n   FLEET\r?\n   ======================================== \*\/)/, heroCss + '\n\n');

if (!css.includes('.btn--outline-white')) {
    const btnWhite = `
.btn--outline-white {
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.4);
    color: #fff;
}
.btn--outline-white:hover {
    background: rgba(255,255,255,0.1);
    border-color: #fff;
    transform: translateY(-2px);
}
`;
    css = css.replace('.btn--outline:hover {\r\n    background: var(--gold-glow);\r\n    transform: translateY(-2px);\r\n}', '.btn--outline:hover {\n    background: var(--gold-glow);\n    transform: translateY(-2px);\n}' + btnWhite);
    css = css.replace('.btn--outline:hover {\n    background: var(--gold-glow);\n    transform: translateY(-2px);\n}', '.btn--outline:hover {\n    background: var(--gold-glow);\n    transform: translateY(-2px);\n}' + btnWhite); // just in case
}

fs.writeFileSync('style.css', css, 'utf-8');

console.log('Update completed.');
