import { Router } from 'https://deno.land/x/oak/mod.ts';
import { generate } from './modules/generate-card-number.ts';

const router = new Router();

router.get('/credit-card/generate/:flag/:finalDigit', (ctx) => {
  const { flag, finalDigit } = ctx.params;
  ctx.response.body = generate(flag, finalDigit);
});

export default router;