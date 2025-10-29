import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#2C2F38] to-[#1B1F3B]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#1B1F3B]/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-4xl">💪</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent">
              PompeurPro
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="#faq"
              className="px-4 py-2 text-[#F4F4F4] hover:text-[#00BFFF] transition-colors"
            >
              FAQ
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Télécharger
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24">
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <span className="text-6xl mb-6 inline-block">💪</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-[#F4F4F4] mb-6">
            Transforme ton corps,
            <br />
            <span className="bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent">
              une pompe à la fois
            </span>
          </h2>
          <p className="text-xl text-[#B0B3B8] max-w-2xl mx-auto mb-8">
            Grâce à l&apos;IA, transforme ton smartphone en coach personnel.
            Compte automatiquement tes pompes, suis ta progression et rejoins une communauté de +10 000 athlètes ! 🔥
          </p>
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold text-sm mb-8">
            🎉 Version BETA - Gratuite pendant le développement
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-bold text-lg hover:opacity-90 transition-opacity cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              📱 Télécharger sur iOS
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#3A3D46] text-[#F4F4F4] font-semibold hover:bg-[#4A4D56] transition-colors"
            >
              📱 Télécharger sur Android
            </a>
          </div>
          <div className="text-[#B0B3B8] text-sm">
            ✓ 100% Gratuit • ✓ Toutes les fonctionnalités • ✓ Sans publicité
          </div>
        </section>

        {/* Problem Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 bg-[#2C2F38]/50 rounded-3xl my-10">
          <h3 className="text-3xl font-bold text-center text-[#F4F4F4] mb-4">
            Tu galères avec ton entraînement ? 😓
          </h3>
          <p className="text-center text-[#B0B3B8] mb-12 max-w-2xl mx-auto">
            On connaît tous ces problèmes...
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤯</div>
              <h4 className="text-xl font-bold text-[#F4F4F4] mb-3">
                Perdre le compte
              </h4>
              <p className="text-[#B0B3B8]">
                Impossible de se concentrer quand tu dois compter tes pompes dans ta tête. Tu perds le fil et ça casse ta motivation.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📉</div>
              <h4 className="text-xl font-bold text-[#F4F4F4] mb-3">
                Pas de suivi
              </h4>
              <p className="text-[#B0B3B8]">
                Tu ne sais pas si tu progresses vraiment. Aucune statistique, aucun objectif clair. C&apos;est démotivant sur le long terme.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">😴</div>
              <h4 className="text-xl font-bold text-[#F4F4F4] mb-3">
                Manque de motivation
              </h4>
              <p className="text-[#B0B3B8]">
                S&apos;entraîner seul c&apos;est difficile. Sans communauté ni challenges, tu abandonnes rapidement tes bonnes résolutions.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-center text-[#F4F4F4] mb-16">
            Pourquoi PompeurPro ? 🚀
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10 hover:border-[#00BFFF]/50 transition-all">
              <div className="text-5xl mb-4">📸</div>
              <h4 className="text-2xl font-bold text-[#F4F4F4] mb-3">
                Détection Intelligente
              </h4>
              <p className="text-[#B0B3B8]">
                Grâce à la reconnaissance faciale et l&apos;IA, l&apos;app compte automatiquement
                tes pompes. Plus besoin de compter dans ta tête !
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10 hover:border-[#8E2DE2]/50 transition-all">
              <div className="text-5xl mb-4">📊</div>
              <h4 className="text-2xl font-bold text-[#F4F4F4] mb-3">
                Suis ta Progression
              </h4>
              <p className="text-[#B0B3B8]">
                Visualise tes statistiques quotidiennes, hebdomadaires et mensuelles.
                Maintiens ta streak et célèbre tes progrès !
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10 hover:border-[#00BFFF]/50 transition-all">
              <div className="text-5xl mb-4">🏆</div>
              <h4 className="text-2xl font-bold text-[#F4F4F4] mb-3">
                Défis et Classements
              </h4>
              <p className="text-[#B0B3B8]">
                Participe à des défis, grimpe dans le classement mondial et
                partage tes séances avec la communauté !
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10 hover:border-[#8E2DE2]/50 transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-2xl font-bold text-[#F4F4F4] mb-3">
                Modes d&apos;Entraînement
              </h4>
              <p className="text-[#B0B3B8]">
                Mode libre, minuteur, séries... Adapte ton entraînement selon
                tes objectifs et ton niveau.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10 hover:border-[#00BFFF]/50 transition-all">
              <div className="text-5xl mb-4">📴</div>
              <h4 className="text-2xl font-bold text-[#F4F4F4] mb-3">
                Mode Hors Ligne
              </h4>
              <p className="text-[#B0B3B8]">
                Entraîne-toi même sans connexion ! Tes données se synchronisent
                automatiquement quand tu es en ligne.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10 hover:border-[#8E2DE2]/50 transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-2xl font-bold text-[#F4F4F4] mb-3">
                Gamification
              </h4>
              <p className="text-[#B0B3B8]">
                Citations motivantes, badges, confettis... Reste motivé et
                transforme chaque entraînement en victoire !
              </p>
            </div>
          </div>
        </section>

        {/* Motivational Quotes */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-[#00BFFF]/20 to-[#8E2DE2]/20 rounded-2xl p-12 border border-white/10">
            <div className="text-center">
              <p className="text-2xl md:text-3xl text-[#F4F4F4] font-semibold mb-4">
                💪 Chaque pompe est un pas vers la meilleure version de toi-même
              </p>
              <p className="text-lg text-[#B0B3B8]">
                Rejoins la communauté PompeurPro et transforme ton entraînement dès aujourd&apos;hui !
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof / Testimonials Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-center text-[#F4F4F4] mb-4">
            Ils ont transformé leur corps avec PompeurPro 💬
          </h3>
          <p className="text-center text-[#B0B3B8] mb-12">
            Rejoins plus de 10 000 athlètes satisfaits
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-2xl">
                  👨
                </div>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Thomas M.</p>
                  <p className="text-[#B0B3B8] text-sm">Étudiant, 22 ans</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-[#B0B3B8]">
                &quot;Incroyable ! Je suis passé de 20 pompes à 100 en 3 mois. L&apos;IA qui compte automatiquement est juste géniale, je peux enfin me concentrer sur ma forme.&quot;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-2xl">
                  👩
                </div>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Sarah L.</p>
                  <p className="text-[#B0B3B8] text-sm">Coach sportif, 28 ans</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-[#B0B3B8]">
                &quot;Je recommande PompeurPro à tous mes clients ! Les statistiques détaillées permettent de suivre vraiment les progrès. Un must-have !&quot;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-2xl">
                  👨
                </div>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Marc D.</p>
                  <p className="text-[#B0B3B8] text-sm">Entrepreneur, 35 ans</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-[#B0B3B8]">
                &quot;Avec mon emploi du temps chargé, j&apos;adore le mode hors ligne. Je m&apos;entraîne n&apos;importe où, n&apos;importe quand. La communauté est super motivante !&quot;
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent mb-2">
                10 000+
              </p>
              <p className="text-[#B0B3B8]">Utilisateurs actifs</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent mb-2">
                2M+
              </p>
              <p className="text-[#B0B3B8]">Pompes comptées</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent mb-2">
                4.8/5
              </p>
              <p className="text-[#B0B3B8]">Note moyenne</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent mb-2">
                98%
              </p>
              <p className="text-[#B0B3B8]">Satisfaction client</p>
            </div>
          </div>
        </section>

        {/* Beta Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-[#00BFFF]/20 to-[#8E2DE2]/20 rounded-3xl p-12 border border-white/10 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold text-sm mb-6">
              🎉 VERSION BETA - 100% GRATUITE
            </div>
            <h3 className="text-3xl font-bold text-center text-[#F4F4F4] mb-4">
              Toutes les fonctionnalités, gratuitement 🎁
            </h3>
            <p className="text-center text-[#B0B3B8] mb-12 max-w-2xl mx-auto">
              Profite de toutes les fonctionnalités premium sans débourser un centime pendant la phase de développement. Aide-nous à améliorer l&apos;app !
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Comptage automatique IA</p>
                  <p className="text-sm text-[#B0B3B8]">Précision de 98%</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Statistiques avancées</p>
                  <p className="text-sm text-[#B0B3B8]">Graphiques détaillés</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Programmes personnalisés</p>
                  <p className="text-sm text-[#B0B3B8]">Illimités</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Challenges communauté</p>
                  <p className="text-sm text-[#B0B3B8]">Tous inclus</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Mode hors ligne</p>
                  <p className="text-sm text-[#B0B3B8]">Entraîne-toi partout</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="text-[#F4F4F4] font-semibold">Sans publicité</p>
                  <p className="text-sm text-[#B0B3B8]">Expérience pure</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-xl"
              >
                Télécharger maintenant
              </a>
              <p className="text-sm text-[#B0B3B8] mt-4">
                Disponible sur iOS et Android
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-center text-[#F4F4F4] mb-4">
            Questions fréquentes 💡
          </h3>
          <p className="text-center text-[#B0B3B8] mb-12">
            Tout ce que tu dois savoir sur PompeurPro
          </p>
          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 group">
              <summary className="font-semibold text-[#F4F4F4] cursor-pointer list-none flex justify-between items-center">
                Comment l&apos;IA compte-t-elle mes pompes ?
                <span className="text-[#00BFFF] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#B0B3B8] mt-4">
                Notre technologie utilise la détection faciale ML Kit de Google. Elle analyse les mouvements de ta tête pendant l&apos;exercice pour compter automatiquement chaque répétition avec une précision de 98%. Pas besoin de capteurs externes !
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 group">
              <summary className="font-semibold text-[#F4F4F4] cursor-pointer list-none flex justify-between items-center">
                Puis-je utiliser l&apos;app sans connexion Internet ?
                <span className="text-[#00BFFF] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#B0B3B8] mt-4">
                Absolument ! PompeurPro fonctionne en mode hors ligne. Toutes tes séances sont enregistrées localement et se synchronisent automatiquement dès que tu te reconnectes. Entraîne-toi n&apos;importe où, n&apos;importe quand !
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 group">
              <summary className="font-semibold text-[#F4F4F4] cursor-pointer list-none flex justify-between items-center">
                L&apos;application est-elle vraiment gratuite ?
                <span className="text-[#00BFFF] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#B0B3B8] mt-4">
                Oui ! PompeurPro est actuellement en phase BETA et totalement gratuite avec toutes les fonctionnalités. Aucun paiement, aucune publicité, aucun piège. Télécharge et profite de toutes les features premium sans débourser un centime.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 group">
              <summary className="font-semibold text-[#F4F4F4] cursor-pointer list-none flex justify-between items-center">
                L&apos;app est-elle disponible sur iOS et Android ?
                <span className="text-[#00BFFF] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#B0B3B8] mt-4">
                Oui ! PompeurPro est disponible sur l&apos;App Store (iOS 13+) et le Google Play Store (Android 8+). L&apos;application est optimisée pour offrir la meilleure expérience sur tous les smartphones modernes.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 group">
              <summary className="font-semibold text-[#F4F4F4] cursor-pointer list-none flex justify-between items-center">
                Comment puis-je contribuer au développement ?
                <span className="text-[#00BFFF] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#B0B3B8] mt-4">
                En tant que beta testeur, ton feedback est précieux ! Utilise la fonction de feedback dans l&apos;app, partage tes idées d&apos;améliorations et signale les bugs. Tu nous aides à créer la meilleure app de pompes possible !
              </p>
            </details>

            {/* FAQ 6 */}
            <details className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 group">
              <summary className="font-semibold text-[#F4F4F4] cursor-pointer list-none flex justify-between items-center">
                Mes données sont-elles sécurisées ?
                <span className="text-[#00BFFF] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#B0B3B8] mt-4">
                Ta vie privée est notre priorité. Toutes tes données sont chiffrées de bout en bout. Nous n&apos;utilisons la caméra que pour la détection de mouvement, aucune vidéo n&apos;est enregistrée ou partagée. Conformité RGPD garantie.
              </p>
            </details>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-center text-[#F4F4F4] mb-16">
            Technologie de Pointe 🤖
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-[#2C2F38] rounded-xl p-6 border border-white/10">
              <p className="text-4xl mb-2">⚛️</p>
              <p className="text-[#F4F4F4] font-semibold">React Native</p>
              <p className="text-sm text-[#B0B3B8]">iOS & Android</p>
            </div>
            <div className="bg-[#2C2F38] rounded-xl p-6 border border-white/10">
              <p className="text-4xl mb-2">🧠</p>
              <p className="text-[#F4F4F4] font-semibold">ML Kit</p>
              <p className="text-sm text-[#B0B3B8]">Détection Faciale</p>
            </div>
            <div className="bg-[#2C2F38] rounded-xl p-6 border border-white/10">
              <p className="text-4xl mb-2">📈</p>
              <p className="text-[#F4F4F4] font-semibold">Statistiques</p>
              <p className="text-sm text-[#B0B3B8]">Graphiques en temps réel</p>
            </div>
            <div className="bg-[#2C2F38] rounded-xl p-6 border border-white/10">
              <p className="text-4xl mb-2">🔐</p>
              <p className="text-[#F4F4F4] font-semibold">OAuth 2.0</p>
              <p className="text-sm text-[#B0B3B8]">Google & Apple</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-[#00BFFF]/20 to-[#8E2DE2]/20 rounded-3xl p-12 md:p-16 border border-white/10 text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-[#F4F4F4] mb-6">
              Prêt à transformer ton corps ? 🚀
            </h3>
            <p className="text-xl text-[#B0B3B8] mb-8 max-w-2xl mx-auto">
              Rejoins plus de 10 000 athlètes qui transforment déjà leur corps avec PompeurPro. Essai gratuit 7 jours, sans carte bancaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="#tarifs"
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                Commencer maintenant
              </a>
              <a
                href="#demo"
                className="px-10 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-[#F4F4F4] font-semibold hover:bg-white/20 transition-colors"
              >
                Regarder la démo
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#B0B3B8]">
              <span className="flex items-center gap-2">
                ✓ Essai gratuit 7 jours
              </span>
              <span className="flex items-center gap-2">
                ✓ Sans carte bancaire
              </span>
              <span className="flex items-center gap-2">
                ✓ Annulation en 1 clic
              </span>
              <span className="flex items-center gap-2">
                ✓ iOS & Android
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">💪</div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent">
                  PompeurPro
                </h3>
              </div>
              <p className="text-[#B0B3B8] text-sm">
                L&apos;application intelligente qui transforme ton entraînement aux pompes grâce à l&apos;IA.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-[#F4F4F4] font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-[#B0B3B8]">
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">Fonctionnalités</a></li>
                <li><a href="#tarifs" className="hover:text-[#00BFFF] transition-colors">Tarifs</a></li>
                <li><a href="#faq" className="hover:text-[#00BFFF] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">Télécharger</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[#F4F4F4] font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-[#B0B3B8]">
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal & Social */}
            <div>
              <h4 className="text-[#F4F4F4] font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-[#B0B3B8] mb-6">
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-[#00BFFF] transition-colors">Mentions légales</a></li>
              </ul>
              <div className="flex gap-4">
                <a href="#" className="text-2xl hover:text-[#00BFFF] transition-colors">📘</a>
                <a href="#" className="text-2xl hover:text-[#00BFFF] transition-colors">📸</a>
                <a href="#" className="text-2xl hover:text-[#00BFFF] transition-colors">🐦</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center text-[#B0B3B8] text-sm">
            <p>&copy; 2025 PompeurPro. Tous droits réservés.</p>
            <p className="mt-2">
              Made with 💪 for the fitness community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
