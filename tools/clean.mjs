/**
 * Remove the build output.
 *
 * On Windows an orphaned `eleventy --serve` or `wrangler dev` keeps regenerating
 * _site/ and locks the folder, so a delete fails with EPERM. That is a real
 * recurring failure mode (spec §15), so this reports it clearly instead of
 * emitting a confusing stack trace.
 */

import { rmSync, existsSync } from "node:fs";

const OUT = "_site";

if (!existsSync(OUT)) {
  console.log("nothing to clean");
  process.exit(0);
}

try {
  rmSync(OUT, { recursive: true, force: true });
  console.log("removed _site/");
} catch (error) {
  if (error.code === "EPERM" || error.code === "EBUSY") {
    console.error(
      `\nCould not remove _site/ — it is locked.\n\n` +
        `A dev server is probably still running and regenerating it.\n` +
        `On Windows, check for stray node processes:\n\n` +
        `  Get-CimInstance Win32_Process -Filter "Name='node.exe'"\n\n` +
        `An Explorer window sitting inside the folder can also lock it.\n`
    );
    process.exit(1);
  }
  throw error;
}
