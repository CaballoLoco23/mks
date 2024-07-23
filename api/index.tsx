import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Frog Frame',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', (c) => {
  const { buttonValue} = c
  
  return c.res({
    image: '/img-frame1.png',
    imageAspectRatio: '1:1',
    intents: [
      
      <Button action='/portada'>🔗 Official links</Button>,
      
    ],
  })
})
         
    app.frame('/portada', (c) => {
      const { buttonValue} = c
      
      return c.res({
        image: '/img-frame2.png',
        imageAspectRatio: '1:1',

    intents: [
      <Button.Link href='https://www.masks.wtf'>🌐 Website</Button.Link>,
      <Button.Link href='https://t.me/MasksToken'>Telegram</Button.Link>,
      <Button.Link href='https://paragraph.xyz/@masks'>Paragraph</Button.Link>,
      <Button.Reset>Back</Button.Reset>,
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
