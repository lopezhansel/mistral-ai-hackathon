
export async function createAnimation(prompt: string) {
  const body = JSON.stringify({ prompt })
  const res = await fetch('http://127.0.0.1:3000/api/animation/', { method: 'post', body, mode: 'cors' })

  return res.json()
}

export async function getAnimation(animationId: string) {
  const res = await fetch('http://127.0.0.1:3000/api/animation/' + animationId, { mode: 'cors' })

  return res.json() as Promise<{ message: string }>
}