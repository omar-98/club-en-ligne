import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/effectif")({
  head: () => ({
    meta: [
      { title: "Effectif — FCAZ" },
      { name: "description", content: "Les joueurs du FC Ait Zeggane." },
      { property: "og:title", content: "Effectif — FCAZ" },
      { property: "og:description", content: "Découvrez notre équipe." },
    ],
  }),
  component: EffectifPage,
});

interface Player {
  name: string;
  number: number;
  position: string;
  initials: string;
}

const positions: { label: string; players: Player[] }[] = [
  {
    label: "Gardiens",
    players: [
      { name: "Lucas Martineau", number: 1, position: "Gardien", initials: "LM" },
      { name: "Hugo Perrier", number: 16, position: "Gardien", initials: "HP" },
    ],
  },
  {
    label: "Défenseurs",
    players: [
      { name: "Maxime Dupont", number: 2, position: "Latéral Droit", initials: "MD" },
      { name: "Ibrahim Diallo", number: 4, position: "Défenseur Central", initials: "ID" },
      { name: "Thomas Leroy", number: 5, position: "Défenseur Central", initials: "TL" },
      { name: "Antoine Bernard", number: 3, position: "Latéral Gauche", initials: "AB" },
      { name: "Youssef Amrani", number: 13, position: "Défenseur Central", initials: "YA" },
    ],
  },
  {
    label: "Milieux",
    players: [
      { name: "Karim Benali", number: 6, position: "Milieu Défensif", initials: "KB" },
      { name: "Julien Marchand", number: 8, position: "Milieu Central", initials: "JM" },
      { name: "Paul Girard", number: 10, position: "Meneur de jeu", initials: "PG" },
      { name: "Sofiane Khelifi", number: 14, position: "Milieu Droit", initials: "SK" },
    ],
  },
  {
    label: "Attaquants",
    players: [
      { name: "Alexandre Dubois", number: 9, position: "Avant-Centre", initials: "AD" },
      { name: "Moussa Traoré", number: 7, position: "Ailier Gauche", initials: "MT" },
      { name: "Romain Faure", number: 11, position: "Ailier Droit", initials: "RF" },
    ],
  },
];

function EffectifPage() {
  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Effectif" subtitle="Saison 2025/2026" />

        {positions.map((group) => (
          <div key={group.label} className="mb-12">
            <h3 className="text-xl font-bold font-heading text-primary mb-6">{group.label}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {group.players.map((p, i) => (
                <motion.div
                  key={p.number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gradient-card rounded-lg border border-border p-4 text-center hover-lift"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-3">
                    <span className="font-heading font-bold text-primary text-lg">{p.initials}</span>
                  </div>
                  <div className="font-heading font-bold text-2xl text-primary">{p.number}</div>
                  <div className="font-heading font-bold text-foreground text-sm mt-1">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.position}</div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
