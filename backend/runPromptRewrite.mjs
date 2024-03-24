import fs from 'node:fs';
import { spawn } from 'node:child_process'
import path from 'node:path';

export function runPromptRewrite(
  prompt = '',
  uuid = ''
) {
  return new Promise((resolve, reject) => {
    const stdOutFile = fs.createWriteStream(
      path.join(process.cwd(), 'khan-classes', `${uuid}-stdout.log`)
    );
    const stdErrFile = fs.createWriteStream(
      path.join(process.cwd(), 'khan-classes', `${uuid}-stderr.log`)
    );
    const args = ['./run_prompt_rewrite.sh', `"${prompt}"`, `"${uuid}"`];
    const childProcess = spawn('bash', args, {
      cwd: process.cwd(),
    });
    childProcess.stdout.pipe(stdOutFile);
    childProcess.stderr.pipe(stdErrFile);

    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve(code)
      }

      reject(code)
    });
  })
}
