import useLocalStorageState from "use-local-storage-state";

export interface AppSettings {
  voice: boolean;
  volume: number; // 0..1
  rate: number; // 0.7..1.3
}

const DEFAULTS: AppSettings = {
  voice: true,
  volume: 0.9,
  rate: 1.0,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorageState<AppSettings>(
    "contortion:settings",
    { defaultValue: DEFAULTS },
  );

  const update = (patch: Partial<AppSettings>) =>
    setSettings({ ...settings, ...patch });

  return { settings, update };
}

export function readSettings(): AppSettings {
  try {
    const raw = localStorage.getItem("contortion:settings");
    if (raw) {
      const v = JSON.parse(raw) as Partial<AppSettings>;
      return { ...DEFAULTS, ...v };
    }
  } catch {
    /* ignore */
  }
  return DEFAULTS;
}
