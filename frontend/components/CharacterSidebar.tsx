"use client";

import React, { useState } from "react";
import FallbackImage from '@/components/ui/FallbackImage';
import { CharacterData } from "@/types/character";
import { useAdmin } from "@/hooks/useAdmin";
import SignatureWeaponFormModal from "./admin/SignatureWeaponFormModal";
import { fetchGraphQL } from "@/lib/graphql";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

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
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 shadow-[var(--atlas-shadow)] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 ring-1 ring-[var(--border-default)] group-hover/w:ring-[var(--fantasy-gold)]">
        {/* Soft glow behind the image */}
        <div className="absolute inset-0 bg-[var(--gold-glow)] blur-xl opacity-0 group-hover/w:opacity-100 transition-opacity duration-500" />
        {icon ? (
          <FallbackImage src={icon} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]">
            No Icon
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <span className="text-[var(--text-primary)] font-bold text-xs sm:text-sm leading-tight break-words drop-shadow-md line-clamp-2">
          {name}
        </span>
        <span className="text-[var(--gold-ink)] text-xs font-black uppercase tracking-wider mt-1">
          {label}
        </span>
      </div>
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
  const router = useRouter();
  const { isAdmin } = useAdmin();

  const sigWeapons = character.signatureWeapons || [];

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
      <div>
        {/* ── Signature Weapon ── */}
        {(sigWeapons.length > 0 || isAdmin) && (
          <div className="atlas-surface p-4 mt-3 relative overflow-hidden group flex-[2] min-w-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold-glow)] rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[var(--accent-primary-light)] text-sm font-bold">
                Signature Weapon
              </span>
              {isAdmin && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--gold-glow)] hover:bg-[color-mix(in_srgb,var(--fantasy-gold)_28%,var(--bg-surface))] text-[var(--gold-ink)] p-1 rounded border border-[var(--border-gold)]"
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
                <div className="text-xs text-[var(--text-secondary)] italic py-2 w-full text-center">
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
