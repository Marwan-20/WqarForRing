const dotenv = require('dotenv')
const openai = require('openai')

dotenv.config()

const clint = new openai.OpenAI({
  apiKey: process.env.AI_SECRTKEY 
})

async function  extractInfo(text) {
  try{
    const responce = await clint.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: 'system',
          content: "You are an assistant that extracts e-commerce product listings for a ring and gemstone store. Extract information accurately. If a field is missing, return an empty string or null."
        },
        {
          role: 'user',
          content: text
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "product_extraction",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string", description: "The main name/title of the gemstone or ring" },
              craftsman: { type: "string", description: "The name of the artist or builder who created the stone" },
              size: { type: "string", description: "The ring size or dimensions" },
              price: { type: "string", description: "The numeric price with the symbol if it found" },
              weight: { type: "string", description: "The weight including units, e.g., '4.2g' or '3 carats'" },
              category: { type: "string", description: "extract it from the user text it may be (,بارتاش أحجار, ملكيات, دول ) if it was null (أخرى)" },
              tiktok_url: { type: "string", description: "Any TikTok video link provided. If none, return empty string." },
            },
            required: ["title", "craftsman", "size", "price", "weight", "category", "tiktok_url"],
            additionalProperties: false,
          },
        },
      },
    })

    const jsonResponce = JSON.parse(responce.choices[0].message.content)
    console.log(`Information extracted saved sucsesfuly ${responce.choices[0].message.content}`)
    return jsonResponce;
  } catch (e) {
    throw e
  }
}

module.exports = extractInfo;