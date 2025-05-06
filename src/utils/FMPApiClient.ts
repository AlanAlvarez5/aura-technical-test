import { Company } from "../components/dashboard/CompanySearcher";

export class FMPApiClient {
  static async searchCompanies(query: string): Promise<Company[]> {
    const url = `${import.meta.env.VITE_FMP_HOST}/search?query=${encodeURIComponent(query)}&apikey=${import.meta.env.VITE_FMP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`FMP API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((company: { symbol: string, name: string}) => ({
      code: company.symbol,
      name: company.name,
      enable: true,
    }));
  }
}
