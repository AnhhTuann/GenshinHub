"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CharacterData } from "@/types/character";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useAdmin } from "@/hooks/useAdmin";
import SignatureWeaponFormModal from "./admin/SignatureWeaponFormModal";
import { fetchGraphQL } from "@/lib/graphql";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const ELEMENT_COLOR: Record<string, string> = {
  Pyro: "#ff6b4a",
  Hydro: "#4fc3f7",
  Cryo: "#80deea",
  Electro: "#ce93d8",
  Anemo: "#4db6ac",
  Geo: "#ffd54f",
  Dendro: "#aed581",
};

const ELEMENT_TEXT: Record<string, string> = {
  Pyro: "text-[#ff6b4a]",
  Hydro: "text-[#4fc3f7]",
  Cryo: "text-[#80deea]",
  Electro: "text-[#ce93d8]",
  Anemo: "text-[#4db6ac]",
  Geo: "text-[#ffd54f]",
  Dendro: "text-[#aed581]",
};

const WEAPON_TYPE_MAP: Record<string, string> = {
  Sword: "Kiếm Đơn",
  Claymore: "Trọng Kiếm",
  Polearm: "Vũ Khí Cán Dài",
  Catalyst: "Pháp Khí",
  Bow: "Cung",
};

function WeaponBadge({
  name,
  icon,
  label,
}: {
  name: string;
  icon?: string | null;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 w-28 shrink-0 group/w text-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 shadow-[0_5px_15px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 ring-1 ring-white/10 group-hover/w:ring-amber-500/50">
        {/* Soft glow behind the image */}
        <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover/w:opacity-100 transition-opacity duration-500" />
        {icon ? (
          <Image src={icon} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5 text-[10px] text-white/30">
            No Icon
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <span className="text-white font-bold text-[11px] sm:text-[12px] leading-tight break-words drop-shadow-md line-clamp-2">
          {name}
        </span>
        <span className="text-amber-400/80 text-[8px] sm:text-[9px] font-black uppercase tracking-wider mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
      <span className="text-white/30 text-[10px] font-black uppercase tracking-wider">
        {label}
      </span>
      <span className="text-white/75 font-bold text-xs font-display">
        {value}
      </span>
    </div>
  );
}

export default function CharacterSidebar({
  character,
  allWeapons = [],
}: {
  character: CharacterData;
  allWeapons?: any[];
}) {
  const locale = useLocale();
  const router = useRouter();
  const name = locale === "en" ? character.nameEn : character.nameVi;
  const is5Star = character.rarity === 5;
  const { isAdmin } = useAdmin();

  const sigWeapons = character.signatureWeapons || [];
  const elColor = ELEMENT_COLOR[character.element] ?? "#ffffff";
  const borderColor = is5Star ? "border-amber-500/20" : "border-purple-500/20";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveSignatureWeapons = async (weaponNames: string[]) => {
    try {
      // Strip typename from character
      const stripTypename = (obj: any): any => {
        if (Array.isArray(obj)) return obj.map(stripTypename);
        if (obj !== null && typeof obj === "object") {
          const { __typename, ...rest } = obj;
          const newObj: any = {};
          for (const key in rest) newObj[key] = stripTypename(rest[key]);
          return newObj;
        }
        return obj;
      };

      const fullInput = stripTypename(character);
      // Remove deep fields not meant for Upsert input
      delete fullInput.teams;
      delete fullInput.signatureWeapons; // We will pass it at root
      delete fullInput.birthday;
      delete fullInput.fandomUrl;
      delete fullInput.bestWeapons;
      delete fullInput.bestArtifacts;


      fullInput.signatureWeapons = weaponNames;

      await fetchGraphQL(
        `
        mutation Upsert($input: CharacterInput!) {
          upsertCharacter(input: $input) { id }
        }
      `,
        { input: fullInput },
      );

      router.refresh();
    } catch (err: any) {
      toast.error("Error saving signature weapons: " + err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch">
        {/* ── Info Panel (replaces portrait on sidebar) ── */}
        <div
          className={`relative bg-[#0d0d14]/80 border ${borderColor} rounded-2xl overflow-hidden flex-1 min-w-[250px]`}
          style={{ boxShadow: `0 0 40px -12px ${elColor}25` }}
        >
          {/* Top element accent bar */}
          <div
            className="h-[2px] w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${elColor}80, transparent)`,
            }}
          />

          {/* Character info rows */}
          <div className="p-4">
            <div className="flex flex-col">
              <InfoRow label="Element" value={character.element} />
              <InfoRow label="Weapon" value={character.weapon || "—"} />
              <InfoRow label="Region" value={character.region || "—"} />
              <InfoRow label="Birthday" value={character.birthday || "—"} />
              <InfoRow label="Rarity" value={is5Star ? "★★★★★" : "★★★★"} />
            </div>
          </div>
        </div>

        {/* ── Signature Weapon ── */}
        {(sigWeapons.length > 0 || isAdmin) && (
          <div className="bg-[#0d0d14]/80 border border-amber-500/10 p-4 rounded-2xl relative overflow-hidden group flex-[2] min-w-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center mb-2.5">
              <span className="text-amber-400/70 text-[9px] font-black uppercase tracking-[0.2em]">
                Signature Weapon
              </span>
              {isAdmin && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 p-1 rounded border border-amber-500/20"
                  title="Edit Signature Weapons"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-row flex-wrap gap-4 mt-2">
              {sigWeapons.length === 0 && isAdmin ? (
                <div className="text-xs text-white/30 italic py-2 w-full text-center">
                  No signature weapon set
                </div>
              ) : (
                sigWeapons.map((sig, idx) => (
                  <WeaponBadge
                    key={sig.id || idx}
                    name={sig.nameEn}
                    icon={sig.iconUrl}
                    label={
                      idx === 0 ? "★★★★★ Signature" : "★★★★★ Alt. Signature"
                    }
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* ── Fandom link ── */}
        {character.fandomUrl && (
          <div className="flex-1 min-w-[200px] flex items-stretch">
            <a
              href={character.fandomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors p-4 border border-white/[0.04] hover:border-white/[0.1] rounded-2xl bg-[#0d0d14]/60 h-full"
            >
              <svg
                className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            <span>View on</span>
            <span className="font-bold text-white/50">Fandom Wiki</span>
          </a>
          </div>
        )}
      </div>

      <SignatureWeaponFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSignatureWeapons}
        allWeapons={allWeapons.filter(
          (w) =>
            w.type === WEAPON_TYPE_MAP[character.weapon] ||
            w.type === character.weapon,
        )}
        initialWeapons={sigWeapons.map((w) => w.id)}
      />
    </>
  );
}
