import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires — FC Étoile Rouge" },
      { name: "description", content: "Nos partenaires et sponsors." },
      { property: "og:title", content: "Partenaires — FC Étoile Rouge" },
      { property: "og:description", content: "Les partenaires du club." },
    ],
  }),
  component: PartenairesPage,
});

const mainSponsors = [
  { name: "SportMax", tier: "Premium", description: "Équipementier officiel du club" },
  { name: "BanqueVerte", tier: "Premium", description: "Partenaire bancaire principal" },
];

const sponsors = [
  { name: "AutoPro", description: "Concessionnaire automobile" },
  { name: "TechSolutions", description: "Solutions informatiques" },
  { name: "FoodExpress", description: "Restauration et traiteur" },
  { name: "Immobilière du Sud", description: "Agence immobilière" },
  { name: "PharmaSanté", description: "Santé et bien-être" },
  { name: "MédiaLocal", description: "Média régional partenaire" },
];

function PartenairesPage() {
  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Partenaires & Sponsors" subtitle="Ils nous accompagnent dans l'aventure" />

        {/* Main sponsors */}
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6 text-center">Sponsors Premium</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {mainSponsors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-card rounded-lg border-glow p-8 text-center hover-lift"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
                <span className="font-heading font-bold text-primary text-xl">{s.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <h4 className="font-heading font-bold text-foreground text-xl">{s.name}</h4>
              <p className="text-sm text-muted-foreground mt-2">{s.description}</p>
              <span className="inline-block mt-3 text-xs bg-club-gold/20 text-club-gold px-3 py-1 rounded-full font-bold">{s.tier}</span>
            </motion.div>
          ))}
        </div>

        {/* Other sponsors */}
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6 text-center">Nos Partenaires</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sponsors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg border border-border p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary mx-auto flex items-center justify-center mb-3">
                <span className="font-heading font-bold text-muted-foreground text-sm">{s.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <h4 className="font-heading font-bold text-foreground text-sm">{s.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-card rounded-lg border border-border p-10"
        >
          <h3 className="text-2xl font-bold font-heading text-foreground">Devenez Partenaire</h3>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Rejoignez l'aventure FC Étoile Rouge et bénéficiez d'une visibilité exceptionnelle auprès de milliers de supporters.
          </p>
          <a
            href="mailto:partenaires@fcetoilerouge.fr"
            className="inline-flex items-center justify-center mt-6 bg-primary text-primary-foreground px-8 py-3 rounded-md font-heading font-bold text-sm hover:bg-club-red-light transition-colors"
          >
            Nous Contacter
          </a>
        </motion.div>
      </div>
    </div>
  );
}
