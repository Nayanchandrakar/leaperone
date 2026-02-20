export type AnalyticsParams = {
  to: Date
  from: Date
  memberId: string
  workspaceId: string
}

export type GeoCityRow = { city: string; country: string; count: number }
export type GeoRegionRow = { region: string; country: string; count: number }
export type GeoCountRow = { country: string; count: number }
export type DeviceAnalysisRow = { os: string | null; count: number }
export type BrowserAnalysisRow = { browser: string | null; count: number }
export type ScanAnalysisRow = { day: string; device: string | null; count: number }
export type TimeAnalysisRow = { hour_block: number; device: string | null; count: number }
export type DayAnalysisRow = { day_of_week: number; device: string | null; count: number }

export type AnalyticsResult = {
  totalClicks: number
  scansInRange: number
  topCities: GeoCityRow[]
  topRegions: GeoRegionRow[]
  topCountries: GeoCountRow[]
  dayAnalysis: DayAnalysisRow[]
  scanAnalysis: ScanAnalysisRow[]
  timeAnalysis: TimeAnalysisRow[]
  deviceAnalysis: DeviceAnalysisRow[]
  browserAnalysis: BrowserAnalysisRow[]
}

export type RawAnalyticsRow = {
  total_clicks: number
  scans_in_range: number
  top_cities: GeoCityRow[] | null
  top_regions: GeoRegionRow[] | null
  top_countries: GeoCountRow[] | null
  day_analysis: DayAnalysisRow[] | null
  scan_analysis: ScanAnalysisRow[] | null
  time_analysis: TimeAnalysisRow[] | null
  device_analysis: DeviceAnalysisRow[] | null
  browser_analysis: BrowserAnalysisRow[] | null
}
