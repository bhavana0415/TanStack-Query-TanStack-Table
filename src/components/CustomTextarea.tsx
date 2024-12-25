import { JSONTree } from "react-json-tree";

const jsonTreeTheme = {
  scheme: "atom",
  base00: "bg-slate-900",
  base01: "#353b45",
  base02: "#3e4451",
  base03: "#545862",
  base04: "#565c64",
  base05: "#abb2bf",
  base06: "#b6bdca",
  base07: "#c8ccd4",
  base08: "#e06c75",
  base09: "#d19a66",
  base0A: "#e5c07b",
  base0B: "#98c379",
  base0C: "#56b6c2",
  base0D: "#61afef",
  base0E: "#c678dd",
  base0F: "#be5046",
};

export default function CustomTextarea({ data }) {
  return (
    <div className="relative w-full">
      {data && (
        <div className="max-h-96 overflow-y-auto rounded bg-slate-900 p-3 pt-2 font-mono">
          <JSONTree
            data={JSON.parse(data)}
            theme={jsonTreeTheme}
            invertTheme={false}
            hideRoot
            shouldExpandNodeInitially={() => true}
          />
        </div>
      )}
    </div>
  );
}
