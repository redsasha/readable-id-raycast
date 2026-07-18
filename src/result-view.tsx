import {
  Action,
  ActionPanel,
  Clipboard,
  Detail,
  Icon,
  PopToRootType,
  Toast,
  closeMainWindow,
  showToast,
} from "@raycast/api";
import { useEffect } from "react";

type Row = { label: string; value: string };

type ResultViewProps = {
  /** The converted value to show and copy, or `undefined` when conversion failed. */
  result?: string;
  /** Human label for the result kind — "Readable ID" or "UUID". */
  resultLabel: string;
  /** Metadata rows describing the input and resolved type. */
  rows: Row[];
  /** Error message when conversion failed. */
  error?: string;
};

/**
 * Renders a conversion result as a Detail: on success it auto-copies the value and toasts "Copied";
 * on failure it shows the {@link ReadableIdError} message and a failure toast. Shared by both commands.
 */
export function ResultView({ result, resultLabel, rows, error }: ResultViewProps) {
  const ok = result !== undefined;

  useEffect(() => {
    let toast: Toast | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    (async () => {
      if (ok) {
        await Clipboard.copy(result);
        toast = await showToast({ style: Toast.Style.Success, title: "Copied", message: result });
        timer = setTimeout(() => toast?.hide(), 250);
      } else {
        await showToast({ style: Toast.Style.Failure, title: "Invalid input", message: error });
      }
    })();
    return () => {
      if (timer) clearTimeout(timer);
      toast?.hide();
    };
  }, [ok, result, error]);

  const markdown = ok
    ? `# ${resultLabel}\n\n\`\`\`\n${result}\n\`\`\``
    : `# Invalid input\n\n${error ?? "Could not convert."}`;

  return (
    <Detail
      markdown={markdown}
      metadata={
        rows.length > 0 ? (
          <Detail.Metadata>
            {rows.map((r) => (
              <Detail.Metadata.Label key={r.label} title={r.label} text={r.value} />
            ))}
          </Detail.Metadata>
        ) : undefined
      }
      actions={
        ok ? (
          <ActionPanel>
            <Action
              title={`Copy ${resultLabel} & Close`}
              icon={Icon.Clipboard}
              onAction={async () => {
                await Clipboard.copy(result);
                await closeMainWindow({ popToRootType: PopToRootType.Immediate });
              }}
            />
            <Action.CopyToClipboard title={`Copy ${resultLabel}`} content={result} />
            {rows.map((r) => (
              <Action.CopyToClipboard key={r.label} title={`Copy ${r.label}`} content={r.value} />
            ))}
          </ActionPanel>
        ) : undefined
      }
    />
  );
}
