// Optional Excel loader for when business users provide data in .xlsx
import xlsx from 'xlsx';

export function sheetToJson(path, sheetName) {
  const wb = xlsx.readFile(path);
  const ws = wb.Sheets[sheetName || wb.SheetNames[0]];
  return xlsx.utils.sheet_to_json(ws, { defval: null });
}
