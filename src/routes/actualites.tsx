import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités — FC Étoile Rouge" },
      { name: "description", content: "Toutes les actualités du FC Étoile Rouge." },
      { property: "og:title", content: "Actualités — FC Étoile Rouge" },
      { property: "og:description", content: "Toutes les actualités du club." },
    ],
  }),
  component: ActualitesPage,
});

const articles = [
  { id: 1, title: "Victoire écrasante 3-0 contre l'AS Monaco", date: "12 Avr 2026", category: "Match", excerpt: "Une performance magistrale de notre équipe qui domine le match du début à la fin." },
  { id: 2, title: "Nouveau milieu de terrain : Karim Benali rejoint le club", date: "10 Avr 2026", category: "Transfert", excerpt: "Le joueur international arrive en provenance du FC Bordeaux avec un contrat de 3 ans." },
  { id: 3, title: "Journée portes ouvertes ce samedi", date: "8 Avr 2026", category: "Événement", excerpt: "Venez rencontrer les joueurs et visiter les installations du stade." },
  { id: 4, title: "Bilan mi-saison : 2ème place au classement", date: "5 Avr 2026", category: "Saison", excerpt: "Avec 18 victoires en 24 matchs, l'équipe réalise une saison exceptionnelle." },
  { id: 5, title: "Programme de formation jeunes : inscriptions ouvertes", date: "2 Avr 2026", category: "Formation", excerpt: "L'académie du club ouvre ses portes aux jeunes talents de 8 à 16 ans." },
  { id: 6, title: "Match caritatif au profit des enfants hospitalisés", date: "28 Mar 2026", category: "Événement", excerpt: "L'équipe organise un match spécial pour récolter des fonds." },
];

function ActualitesPage() {
  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Actualités" subtitle="Toutes les nouvelles du FC Étoile Rouge" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-gradient-card rounded-lg overflow-hidden border border-border hover-lift"
            >
              <div className="h-2 bg-primary" />
              <div className="p-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{a.category}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 font-heading leading-tight">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{a.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-4">{a.date}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
