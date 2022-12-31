import { Switch } from "@headlessui/react";

export const Highlights: React.FC<{
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ enabled, setEnabled }) => {
  return (
    <>
      <p className="mt-5 hidden text-sm font-bold text-gray-500 dark:text-gray-400 md:inline-flex">
        Highlights
      </p>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled
            ? "mt-5 bg-blue-600 dark:bg-blue-400"
            : "bg-gray-300 dark:bg-gray-600"
        } relative mt-5 hidden h-6 w-12 items-center rounded-full md:inline-flex`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </>
  );
};
