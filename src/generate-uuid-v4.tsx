import { ResultView } from "./result-view";
import { generateUuidV4 } from "./uuid";

export default function GenerateUuidV4() {
  const result = generateUuidV4();
  return <ResultView result={result} resultLabel="UUID" rows={[{ label: "Version", value: "4" }]} />;
}
