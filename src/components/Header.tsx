import { FaGithub } from "react-icons/fa6";

import icon from "@/assets/icon.png";

import { APP_CONFIG } from "@/config/app";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b-[3px] border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="nb-border nb-shadow-sm inline-block bg-primary px-3 py-1 font-mono text-sm font-bold text-primary-foreground">
            {APP_CONFIG.version}
          </span>

          <span className="nb-border inline-block bg-background px-3 py-1 font-mono text-xs font-bold text-muted-foreground">
            REST • JSON
          </span>

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />

            <a
              href={APP_CONFIG.github.url}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              aria-label="GitHub Repository"
              className="nb-border nb-shadow-sm inline-flex h-9 w-9 shrink-0 items-center justify-center bg-background transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-4">
          <img
            src={icon}
            alt="ArcGateway Logo"
            className="h-12 w-12 shrink-0 drop-shadow-[0_0_12px_var(--ice-blue)] sm:h-16 sm:w-16"
          />

          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            {APP_CONFIG.name.replace("Gateway", "")}
            <span className="text-primary">Gateway</span>
          </h1>
        </div>

        <p className="max-w-2xl text-base text-muted-foreground">
          API playground untuk menguji seluruh endpoint gateway. Klik
          kartu untuk membuka detail, isi parameter, lalu tekan button{" "}
          <span className="font-bold text-foreground">Try it</span> untuk
          mengirim request dan melihat response JSON secara langsung.
        </p>

        <div className="nb-border nb-shadow inline-flex w-fit max-w-full items-center gap-2 overflow-x-auto bg-background px-4 py-3">
          <span className="font-mono text-xs font-bold text-primary">
            BASE URL
          </span>

          <code className="whitespace-nowrap font-mono text-sm">
            {APP_CONFIG.api.baseUrl}
          </code>
        </div>

        <div className="nb-border bg-background px-4 py-3">
          <p className="max-w-2xl text-sm text-muted-foreground">
            <span className="font-mono font-bold text-primary">
              Rate limit:
            </span>{" "}
            Setiap endpoint API memiliki batas maksimal 40 request/menit.
            Pembatasan ini diterapkan untuk meminimalisir spam dan
            penyalahgunaan layanan. Gunakan endpoint dengan bijak dan tidak
            spam agar akses tetap tersedia untuk semua pengguna.
          </p>
        </div>
      </div>
    </header>
  );
}