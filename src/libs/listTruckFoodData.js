import Papa from "papaparse";

const csvFile = "https://raw.githubusercontent.com/peck/engineering-assessment/4969747d29214b7877f6cc2747af5c141973e8a6/Mobile_Food_Facility_Permit.csv";

export async function listTruckFoodData() {
  const csvData = await fetch(csvFile, { next: { revalidate: 86400 } });
  const csvText = await csvData.text();

  const parseResult = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
  });

  return parseResult.data.filter(
    (location) => !!location.Latitude && !!location.Longitude,
  );
}
