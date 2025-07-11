import { Switch } from '@headlessui/react';
import { useState } from 'react';

export default function SwitchInput() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      // DO NOT PASS ADDITIONAL PROPERTIES
      checked={enabled}
      onChange={setEnabled}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-slate-500 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-slate-700 data-focus:outline data-focus:outline-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  );
}