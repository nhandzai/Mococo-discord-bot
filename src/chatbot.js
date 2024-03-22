const { log } = require('console');
const OpenAI = require('openai');
const openai = new OpenAI();

async function chatBot(prompt_) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt_ }], 
    max_tokens: 60,
    temperature: 0,
  });

  let response = completion.choices[0].message.content;
  return response
}

module.exports = {
  chatBot: chatBot
};
