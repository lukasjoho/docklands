<div align="center" >
    <h1 align="center">Meet Again</h1>
    <p>A for-fun event promotion page I built for a friends reunion event, that I organized with close friends of mine.</p>
    🌐 <a href="https://meet-again.de">meet-again.de</a>
    <br/>
    <br/>
</div>

![alt text](https://github.com/lukasjoho/docklands/assets/53558967/58bc60f0-5b65-4689-97ab-538d57ad8338)

# Tools

Built with:

- [OpenAI Asstant API](https://nextjs.org/docs): Chat Feature
- [Google Map React](https://www.npmjs.com/package/google-map-react): Maps Render
- [Uploadthing](https://uploadthing.com): Image Storage & Uploading
- [Openweathermap](https://openweathermap.org/): Weather API

# Setup

## Installation

Run the following command to install all dependencies:

```sh-session
npm install
```

## Environment Variables

Create `.env` file and paste the variables.

```sh-session
OPENAI_API_KEY='xxx'
ASSISTANT_ID='xxx'
WEATHER_API_KEY='xxx'
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY='xxx'
POSTGRES_PRISMA_URL='xxx'
POSTGRES_URL_NON_POOLING='xxx'
UPLOADTHING_SECRET='xxx'
UPLOADTHING_APP_ID='xxx'
NEXT_PUBLIC_URL='https://xxx.com'
```

## Run

To run the project locally, use the following command:

```sh-session
npm run dev
```
