export function exportAsCsv(filename: string, rows: any[][]) {
  const csv = rows.map(r => r.map(v => {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    if (/[",\n]/.test(s)) return `"${s}"`;
    return s;
  }).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportAsJson(filename: string, data: any[]) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Sencilla exportación a hoja XLSX-like (CSV con extensión xlsx no es correcto, pero útil mientras tanto).
// Para una exportación real, integrar xlsx.
export function exportAsXlsx(filename: string, headers: string[], rows: any[][]) {
  const data = [headers, ...rows];
  exportAsCsv(filename.replace(/\.xlsx$/i, ".csv"), data);
}


