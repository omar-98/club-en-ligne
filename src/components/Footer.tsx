import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-lg">
              FC
            </div>
            <span className="font-heading text-xl font-bold text-foreground">FC ÉTOILE ROUGE</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Passion, engagement et fierté depuis 1920. Rejoignez-nous dans l'aventure.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-bold text-foreground mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/actualites", label: "Actualités" },
              { to: "/matchs", label: "Matchs" },
              { to: "/effectif", label: "Effectif" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-sm font-bold text-foreground mb-4">Contact</h4>
          <p className="text-sm text-muted-foreground">Stade Municipal, 12 Rue du Sport</p>
          <p className="text-sm text-muted-foreground">75000 Paris, France</p>
          <p className="text-sm text-muted-foreground mt-2">contact@fcetoilerouge.fr</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FC Étoile Rouge. Tous droits réservés.
      </div>
    </footer>
  );
}
