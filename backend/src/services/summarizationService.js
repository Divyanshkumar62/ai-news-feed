import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function runOllamaSummary(newsContent) {
    try {
        const ngrokUrl = process.env.N_GROK_URL;

        const response = await fetch(`${ngrokUrl}/api/generate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                model: "mistral:instruct",
                prompt:
                    "You are a Concise Summarizer. Summarize this under 30 words: " +
                    newsContent,
            }),
            timeout: 10000, // Increase timeout to 10 seconds
        });

        if (!response.ok) {
            console.error(
                `ngrok API error: ${response.status} ${response.statusText}`
            );
            return "";
        }

        const data = await response.json();
        const summary = data.response || "";
        console.log(
            `Ollama summary for: ${newsContent.substring(
                0,
                50
            )}...\nSummary: ${summary.substring(0, 50)}...`
        );
        return summary;
    } catch (error) {
        console.error("Error summarizing with Ollama via ngrok:", error);
        return "";
    }
}

export async function summarizeWithGroq(newsContent) {
    try {
        console.log("Groq API Request:", {
            model: "llama2-70b-4096",
            messages: [
                {
                    role: "user",
                    content: `Summarize the following news article in under 100 words:\n\n${newsContent}`,
                },
            ],
            temperature: 0.3,
            max_completion_tokens: 300,
            top_p: 1,
            stream: false,
        });

        const completion = await groq.chat.completions.create({
            model: "llama2-70b-4096",
            messages: [
                {
                    role: "user",
                    content: `Summarize the following news article in under 100 words:\n\n${newsContent}`,
                },
            ],
            temperature: 0.3,
            max_completion_tokens: 300,
            top_p: 1,
            stream: false,
        });

        console.log("Groq API Response:", completion);

        let summary = "";
        if (
            completion.choices &&
            completion.choices.length > 0 &&
            completion.choices[0].message &&
            completion.choices[0].message.content
        ) {
            summary = completion.choices[0].message.content.trim();
        }

        // Fallback to Ollama only if Groq gave nothing
        if (!summary) {
            console.log("Groq returned an empty summary. Falling back to Ollama...");
            summary = await runOllamaSummary(newsContent);
        }

        return summary;
    } catch (err) {
        console.error("Error summarizing with Groq:", err);
        console.log("Groq failed. Falling back to Ollama...");
        return null;
    }
}

// Function to summarize text using API fallback (ngrok URL)
export async function summarizeWithApiFallback(newsContent) {
    let groqSummary = null;
    try {
        // Attempt to summarize with Groq
        groqSummary = await summarizeWithGroq(newsContent);
        if (groqSummary) {
            console.log("Groq summary generated successfully.");
            return groqSummary;
        }

        console.log("Groq failed or returned an empty summary. Falling back to Ollama summarization...");
    } catch (error) {
        console.error("Error summarizing with Groq:", error);
        console.log("Groq failed. Falling back to Ollama summarization...");
    }

    try {
        const summary = await runOllamaSummary(newsContent);
        return summary;
    } catch (error) {
        console.error("Error summarizing with Ollama via ngrok:", error);
        console.log("Ollama failed.");
        return "";
    }
    console.log("No summary generated at all.");
    return "";

}
