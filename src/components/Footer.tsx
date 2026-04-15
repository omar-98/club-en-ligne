import { Link } from "@tanstack/react-router";
import logoFcaz from "@/assets/logo-fcaz.jpg";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoFcaz} alt="Logo FCAZ" className="w-12 h-12 rounded-full object-cover" width={48} height={48} loading="lazy" />
            <div>
              <span className="font-heading text-lg font-bold text-foreground block">FC Ait Zeggane</span>
              <span className="text-xs text-muted-foreground">FCAZ</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Passion, engagement et fierté. Rejoignez-nous dans l'aventure du football.
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
          <p className="text-sm text-muted-foreground">Ait Zeggane, Algérie</p>
          <p className="text-sm text-muted-foreground mt-2">contact@fcaz.dz</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Football Club Ait Zeggane. Tous droits réservés.
      </div>
    </footer>
  );
}
