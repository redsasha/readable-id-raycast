import { LaunchProps } from "@raycast/api";
import { ReadableIdError, decodeReadableId } from "@redenvelopeorg/utils/src/readableId/codec";
import { getPrefixForObject } from "@redenvelopeorg/utils/src/readableId/registry";
import { ResultView } from "./result-view";

type DecodeArguments = { readableId: string };

export default function Decode(props: LaunchProps<{ arguments: DecodeArguments }>) {
  const input = props.arguments.readableId.trim();

  try {
    const { id, object } = decodeReadableId(input);
    return (
      <ResultView
        result={id}
        resultLabel="UUID"
        rows={[
          { label: "Readable ID", value: input },
          { label: "Object type", value: object },
          { label: "Prefix", value: getPrefixForObject(object) },
        ]}
      />
    );
  } catch (error) {
    const message = error instanceof ReadableIdError ? error.message : String(error);
    return <ResultView resultLabel="UUID" rows={[]} error={message} />;
  }
}
