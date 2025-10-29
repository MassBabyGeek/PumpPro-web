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
          <Link
            href="/admin"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Admin
          </Link>
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
          <p className="text-xl text-[#B0B3B8] max-w-2xl mx-auto mb-12">
            L&apos;application intelligente qui compte automatiquement tes pompes grâce à l&apos;IA.
            Rejoins la communauté et repousse tes limites ! 🔥
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="px-8 py-4 rounded-2xl bg-[#3A3D46] text-[#F4F4F4] font-semibold">
              📱 Télécharge l&apos;application
            </div>
            <div className="text-[#B0B3B8]">iOS & Android</div>
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
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-[#F4F4F4] mb-6">
            Prêt à commencer ? 🚀
          </h3>
          <p className="text-xl text-[#B0B3B8] mb-8 max-w-2xl mx-auto">
            Rejoins des milliers d&apos;athlètes qui transforment déjà leur corps avec PompeurPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-bold text-lg hover:opacity-90 transition-opacity cursor-pointer">
              Télécharger l&apos;application
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#B0B3B8]">
          <p>&copy; 2025 PompeurPro. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            Made with 💪 for the fitness community
          </p>
        </div>
      </footer>
    </div>
  );
}
