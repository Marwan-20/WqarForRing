const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const dotenv = require("dotenv");
const extractInfo = require("./ai");
const { upload, remove } = require("./media");
const { insertingDB, deletingDB } = require("./DBoperation");

// Load env
dotenv.config();

const bot = new Telegraf(process.env.TELGRAM_TOKEN);

let allSession = {};

// to make the system scalable we save the session
function creatSession(chat_id) {
  if (!allSession[chat_id]) {
    allSession[chat_id] = {
      img: [],
      clodinaryLinks: [],
      text: "",
    };
  }
  return allSession[chat_id];
}

// for the imgs
bot.on(message("photo"), async (ctx) => {
  const chat_id = ctx.chat.id;
  const userSession = creatSession(chat_id);

  // habdle the img
  const img = ctx.message.photo;
  const bestImg = img[img.length - 1];
  const imgId = bestImg.file_id; // for donload the img leater
  userSession.img.push(bestImg);

  // upload the img to the cloudinary server
  const folderUrl = await ctx.telegram.getFileLink(imgId);
  const imgUrl = folderUrl.href;
  const cloudinarySourceUrl = await upload(imgUrl);
  userSession.clodinaryLinks.push(cloudinarySourceUrl);

  console.log("img saved");
});

// for the text
bot.on(message("text"), async (ctx) => {
  const chat_id = ctx.chat.id;
  const usermessage = ctx.message.text;
  const userSession = creatSession(chat_id);

  if (userSession.img.length === 0 && usermessage.length > 3) {
    return ctx.reply("رجاء ارسل صورة الخاتم أو الحجر بعد ذالك أرسل الوصف");
  }

  if (usermessage.length <= 3 && userSession.img.length === 0) {
    await remove(usermessage);
    await deletingDB(usermessage);
    return ctx.reply(" 👌ربي يبارك لك حذفت المنتج");
  }

  try {
    // saving the text export it to the AI
    userSession.text = usermessage;
    let productInfo = await extractInfo(userSession.text);

    // insert to the Database
    await insertingDB(userSession, productInfo);

    console.log(`this is the product information ${productInfo}`);

    // delting session
    allSession[chat_id] = null;

    return ctx.reply("الخاتم في الموقع 👍");
  } catch (e) {
    ctx.reply("في مشكلة شيك على السيرفر")
    return console.log(`error while procces the text ${e}`);
  }
});

bot
  .launch()
  .then(() => console.log("Bot ended"))
  .catch((err) => console.error(err));

//  to handle the colse of the bot and not forget any information
process.once("SIGINT", () => bot.stop("SIGINT")); // during devolpment
process.once("SIGTERM", () => bot.stop("SIGTERM")); // for the server