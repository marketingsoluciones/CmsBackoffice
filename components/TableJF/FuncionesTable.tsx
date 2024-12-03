import { FilterFn, SortingFn, sortingFns } from "@tanstack/react-table";
import {  rankItem, compareItems } from '@tanstack/match-sorter-utils'

export const getDate = (date: Date): string => {
  const d = new Date(date)
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d).replace(/\//g, '-')
}

export const getDateTime = (date: Date): string => {
  const d = new Date(date)
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(d).replace(/\//g, '-')
}

export function obtenerPrimerYUltimoDiaSemana() {
  const dI = new Date()
  const d = new Date(dI.getFullYear(), dI.getMonth(), dI.getDate(), 0, 0, 0);
  const dF = new Date(dI.getFullYear(), dI.getMonth(), dI.getDate(), 23, 59, 59);
  const day = d.getDay()
  const dateEpoch = Math.trunc(d.getTime())
  const primero = day === 1 ? d : day > 1 ? new Date((dateEpoch - (day - 1) * 86400000)) : new Date((dateEpoch - 6 * 86400000))
  const ultimo = day === 0 ? dF : new Date((dateEpoch + (7 - day) * 86400000) + 86399000)
  return { primero, ultimo }
}

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0
  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }
  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}