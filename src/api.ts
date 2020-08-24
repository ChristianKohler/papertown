import { SyncConfig, config as default_config } from "./config";
import { sync as command_sync } from "./commands/sync";

export async function sync(config: Partial<SyncConfig>) {
  await command_sync({
    ...default_config,
    ...config,
  });
}
