import React, { useState } from "react";

interface TagSelectorProps {
  includeTags: string[];
  excludeTags: string[];
  matchAll: boolean;
  onChange: (tags: { include_tags: string[]; exclude_tags: string[]; match_all: boolean }) => void;
  availableTags?: string[];
}

export default function TagSelector({
  includeTags,
  excludeTags,
  matchAll,
  onChange,
  availableTags = [],
}: TagSelectorProps) {
  const [includeInput, setIncludeInput] = useState("");
  const [excludeInput, setExcludeInput] = useState("");

  const handleAddIncludeTag = () => {
    const tag = includeInput.trim();
    if (tag && !includeTags.includes(tag) && !excludeTags.includes(tag)) {
      onChange({
        include_tags: [...includeTags, tag],
        exclude_tags: excludeTags,
        match_all: matchAll,
      });
      setIncludeInput("");
    }
  };

  const handleAddExcludeTag = () => {
    const tag = excludeInput.trim();
    if (tag && !excludeTags.includes(tag) && !includeTags.includes(tag)) {
      onChange({
        include_tags: includeTags,
        exclude_tags: [...excludeTags, tag],
        match_all: matchAll,
      });
      setExcludeInput("");
    }
  };

  const handleRemoveIncludeTag = (tag: string) => {
    onChange({
      include_tags: includeTags.filter((t) => t !== tag),
      exclude_tags: excludeTags,
      match_all: matchAll,
    });
  };

  const handleRemoveExcludeTag = (tag: string) => {
    onChange({
      include_tags: includeTags,
      exclude_tags: excludeTags.filter((t) => t !== tag),
      match_all: matchAll,
    });
  };

  const filteredAvailableTags = availableTags
    .filter((tag) => !includeTags.includes(tag) && !excludeTags.includes(tag))
    .slice(0, 10);

  return (
    <div className="space-y-4">
      {/* Tags a incluir */}
      <div>
        <label className="text-xs font-medium block mb-2" style={{ color: "#6B7280" }}>
          Tags a Incluir
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddIncludeTag();
              }
            }}
            className="flex-1 px-3 py-2 text-sm rounded-sm focus:outline-none"
            style={{
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              borderRadius: "2px",
            }}
            placeholder="Escribe un tag y presiona Enter"
            list="include-tags-suggestions"
          />
          <datalist id="include-tags-suggestions">
            {filteredAvailableTags.map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={handleAddIncludeTag}
            className="px-3 py-2 text-xs font-medium rounded-sm text-white transition-colors"
            style={{
              backgroundColor: "#3B82F6",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3B82F6")}
          >
            Agregar
          </button>
        </div>
        {includeTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {includeTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-sm"
                style={{
                  backgroundColor: "#DBEAFE",
                  color: "#1D4ED8",
                  borderRadius: "2px",
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveIncludeTag(tag)}
                  className="ml-1 hover:opacity-70"
                  style={{ color: "#1D4ED8" }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tags a excluir */}
      <div>
        <label className="text-xs font-medium block mb-2" style={{ color: "#6B7280" }}>
          Tags a Excluir
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddExcludeTag();
              }
            }}
            className="flex-1 px-3 py-2 text-sm rounded-sm focus:outline-none"
            style={{
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              borderRadius: "2px",
            }}
            placeholder="Escribe un tag y presiona Enter"
            list="exclude-tags-suggestions"
          />
          <datalist id="exclude-tags-suggestions">
            {filteredAvailableTags.map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={handleAddExcludeTag}
            className="px-3 py-2 text-xs font-medium rounded-sm text-white transition-colors"
            style={{
              backgroundColor: "#DC2626",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B91C1C")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
          >
            Agregar
          </button>
        </div>
        {excludeTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {excludeTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-sm"
                style={{
                  backgroundColor: "#FEE2E2",
                  color: "#991B1B",
                  borderRadius: "2px",
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveExcludeTag(tag)}
                  className="ml-1 hover:opacity-70"
                  style={{ color: "#991B1B" }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Match all checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="match-all"
          checked={matchAll}
          onChange={(e) =>
            onChange({
              include_tags: includeTags,
              exclude_tags: excludeTags,
              match_all: e.target.checked,
            })
          }
          className="w-4 h-4 rounded-sm"
          style={{ accentColor: "#3B82F6" }}
        />
        <label htmlFor="match-all" className="text-xs" style={{ color: "#6B7280" }}>
          Requerir todos los tags (match all)
        </label>
      </div>
    </div>
  );
}

