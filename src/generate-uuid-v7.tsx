import { ResultView } from "./result-view";
import { generateUuidV7 } from "./uuid";

export default function GenerateUuidV7() {
  const result = generateUuidV7();
  return <ResultView result={result} resultLabel="UUID" rows={[{ label: "Version", value: "7" }]} />;
}
