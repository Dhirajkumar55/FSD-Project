module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "icon-library.com",
            "image.pngaaa.com",
            "d2gg9evh47fn9z.cloudfront.net",
            "www.westdalecareers.com",
            "lh3.googleusercontent.com",
            "bootstrapious.com",
        ],
    },
    env:{
        MONGODB_URI : "mongodb+srv://proSpaces:proSpaces@prosapces.g6usv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        APP_SECRET_KEY : "IFYOUSEETHISYOUWILLGOTOHELL",
    },
    async headers() {
        return [
          {
            // matching all API routes
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,authorization" },
            ]
          }
        ]
      }
};