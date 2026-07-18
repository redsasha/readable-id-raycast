import { LaunchProps } from "@raycast/api";
import { ReadableIdError, encodeId } from "@redenvelopeorg/utils/src/readableId/codec";
import { getPrefixForObject, type ObjectType } from "@redenvelopeorg/utils/src/readableId/registry";
import { ResultView } from "./result-view";

type EncodeArguments = { uuid: string; object: string };

export default function Encode(props: LaunchProps<{ arguments: EncodeArguments }>) {
  const uuid = props.arguments.uuid.trim();
  const object = props.arguments.object as ObjectType;

  try {
    const result = encodeId(uuid, object);
    return (
      <ResultView
        result={result}
        resultLabel="Readable ID"
        rows={[
          { label: "UUID", value: uuid },
          { label: "Object type", value: object },
          { label: "Prefix", value: getPrefixForObject(object) },
        ]}
      />
    );
  } catch (error) {
    const message = error instanceof ReadableIdError ? error.message : String(error);
    return <ResultView resultLabel="Readable ID" rows={[]} error={message} />;
  }
}
