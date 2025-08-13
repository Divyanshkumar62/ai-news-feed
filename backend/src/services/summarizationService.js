// Function to summarize text using local LLM (Ollama)

exports.summarizeWithOllama = async (text) => {
  try {
    const command = `echo ${text} | ollama run llama2`;
    const result = await new Promise((resolve, reject) => {
      require('child_process').exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Ollama summarization error: ${error}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
    console.log(`Ollama summary for: ${text.substring(0, 50)}...\nSummary: ${result.substring(0, 50)}...`);
    return result;
  } catch (error) {
    console.error("Error summarizing with Ollama:", error);
    return "";
  }
};

// Function to summarize text using API fallback (Groq API)
const fetch = require('node-fetch');

exports.summarizeWithApiFallback = async (text) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not set in environment variables.");
      return "";
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "mixtral-8x7b-32768",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant that summarizes articles.",
          },
          {
            "role": "user",
            "content": `Summarize the following article: ${text}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`Groq API error: ${response.status} ${response.statusText}`);
      return "";
    }

    const data = await response.json();
    const summary = data.choices[0].message.content || "";
    console.log(`Groq API summary for: ${text.substring(0, 50)}...\nSummary: ${summary.substring(0, 50)}...`);
    return summary;

  } catch (error) {
    console.error("Error summarizing with Groq API:", error);
    return "";
  }
};