const API_KEY = "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";

let conversationHistory = "";
let userName = "";

async function getCompletion(prompt) {
  const response = await fetch(`https://api.openai.com/v1/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt + conversationHistory,
      max_tokens: 700,
    }),
  });

  const data = await response.json();
  
  return data;
}

const prompt = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const output = document.querySelector("#output");

button.addEventListener("click", async () => {
  console.log(prompt.value);

  if (!prompt.value) window.alert("Please enter a prompt");

  const userQuery = prompt.value;
  conversationHistory += `\nUser: ${userQuery}`;

  if (userQuery.includes("me llamo")) {
    const splittedQuery = userQuery.split(" ");
    userName = splittedQuery[2];
  }

  const response = await getCompletion(userQuery);
  console.log(response);

  conversationHistory += `\nChatbot: ${response.choices[0].text}`;

  output.innerHTML = response.choices[0].text;
});