import { spawn } from 'child_process'


export function runPromptRewrite(
  prompt = '',
  uuid = ''
) {
  return new Promise((resolve, reject) => {
    const args = ['./run_prompt_rewrite.sh', `"${prompt}"`, `"${uuid}"`];
    const childProcess = spawn('bash', args, {
      cwd: process.cwd(),
    });

    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve(code)
      }

      reject(code)
    });
  })
}

