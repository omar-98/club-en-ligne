import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FC Étoile Rouge" },
      { name: "description", content: "Contactez le FC Étoile Rouge." },
      { property: "og:title", content: "Contact — FC Étoile Rouge" },
      { property: "og:description", content: "Contactez-nous." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Contact" subtitle="N'hésitez pas à nous écrire" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">Adresse</h4>
                <p className="text-sm text-muted-foreground mt-1">Stade Municipal<br />12 Rue du Sport, 75000 Paris</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">Téléphone</h4>
                <p className="text-sm text-muted-foreground mt-1">+33 1 23 45 67 89</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">Email</h4>
                <p className="text-sm text-muted-foreground mt-1">contact@fcetoilerouge.fr</p>
              </div>
            </div>

            <div className="bg-gradient-card rounded-lg border border-border p-6 mt-6">
              <h4 className="font-heading font-bold text-foreground">Horaires du secrétariat</h4>
              <div className="text-sm text-muted-foreground mt-2 space-y-1">
                <p>Lundi — Vendredi : 9h00 — 18h00</p>
                <p>Samedi : 9h00 — 12h00</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm font-heading font-bold text-foreground block mb-1">Nom</label>
              <input
                type="text"
                className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="text-sm font-heading font-bold text-foreground block mb-1">Email</label>
              <input
                type="email"
                className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-heading font-bold text-foreground block mb-1">Sujet</label>
              <input
                type="text"
                className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Objet de votre message"
              />
            </div>
            <div>
              <label className="text-sm font-heading font-bold text-foreground block mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Votre message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-heading font-bold text-sm hover:bg-club-red-light transition-colors"
            >
              Envoyer le message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
